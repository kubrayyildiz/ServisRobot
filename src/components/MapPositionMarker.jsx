import React, { useRef, useEffect, useState } from "react";
import * as ROS2D from "ros2d";
import * as ROSLIB from "roslib";
import robot from "../images/robot.png";
import table_image1 from "../images/table_image1.png";
import getYawFromQuat from "../scripts/getY";
import { PositionContext } from "./PositionContext";
import CreatePosition from "./CreatePosition";
import { Row, Col,Button } from "react-bootstrap";
import "../Css/MarkerPosition.css";

const Map2 = (props) => {
  const ros = props.ros;

  var gridClient;
  var robot_image;
  var viewer;
  var table_image = null;
  const map = useRef(null);
  const [isOverlayShown, setisoverlayShown] = useState(false);
  const [click_position, setclick_position] = useState({
    x: 0,
    y: 0,
    rotation: 0,
  });
  const [robot_position, setrobot_position] = useState({
    x: 0,
    y: 0,
    rotation: 0,
  });

  const [Color, setColor] = useState("green");
  const [Hint, setHint] = useState("");

  const data = {
    click_position,
    robot_position,
    setisoverlayShown,
    Enable,
  };

  useEffect(() => {
    view_map();
    map.current.style.pointerEvents = "none";
  }, []);

  function overlay_save() {
    viewer.scene.addEventListener("click", function (event) {
      var pose = viewer.scene.globalToRos(event.stageX, event.stageY);
      setclick_position({
        x: Number(pose.x).toFixed(2),
        y: Number(pose.y).toFixed(2),
        rotation: 0,
      });

      setrobot_position({
        x: Number(robot_image.x).toFixed(2),
        y: Number(robot_image.y).toFixed(2),
        rotation: Number(robot_image.rotation).toFixed(2),
      });

      setisoverlayShown(true);
    });
  }

  function render_elments() {
    overlay_save();
    viewer.scene.addEventListener("stagemousemove", function (event) {
      var position = new ROSLIB.Topic({
        ros: ros,
        name: "/robot_pose",
        messageType: "geometry_msgs/Pose",
      });
      position.subscribe((message) => {
        robot_image.x = message.position.x.toFixed(2);
        robot_image.y = -message.position.y.toFixed(2);
        robot_image.rotation = (-getYawFromQuat(message.orientation)).toFixed(
          2
        );
      });
    });
    robot_image = new ROS2D.NavigationImage({
      size: 1.1,
      image: robot,
      pulse: false,
      alpha: 0.9,
    });
    robot_image.x = 10;
    robot_image.y = -10;
    table_image = new ROS2D.NavigationImage({
      size: 1.4,
      image: table_image1,
      alpha: 1,
      pulse: false,
    });
    table_image.x = -100;
    table_image.y = -100;
    viewer.scene.addChild(table_image);
    viewer.scene.addChild(robot_image);
  }

  function view_map() {
    if (map.current.innerHTML !== "") return;
    console.log(ros);
    viewer = new ROS2D.Viewer({
      divID: "map",
      width: 700,
      height: 600,
    });
    gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      continuous: true,
    });

    gridClient.on("change", () => {
      viewer.scaleToDimensions(
        gridClient.currentGrid.width,
        gridClient.currentGrid.height
      );

      try {
        viewer.shift(
          gridClient.currentGrid.pose.position.x,
          gridClient.currentGrid.pose.position.y
        );
      } catch (error) {
        return;
      }
    });

    render_elments();
  }

  function Enable() {
    setColor((current) => !current);
    if (map.current.style.pointerEvents === "auto") {
      setHint("");
      map.current.style.pointerEvents = "none";
    } else if (map.current.style.pointerEvents === "none") {
      setHint("Click On The Map To Add a Position Marker");
      map.current.style.pointerEvents = "auto";
    }
  }

  return (
   
      <Row>
        <Col>
          <Row>
            <PositionContext.Provider value={data}>
              <div className="App">
                <header className="App-header">
                  {isOverlayShown && (
                    <CreatePosition ros={ros}></CreatePosition>
                  )}
                  <Button
                   id="positionmarkerbutton"
                    onClick={Enable}
                  >
                    Add Position Marker
                  </Button>
                  <label id="labelpositionmarker">{Hint}</label>
                </header>
              </div>
            </PositionContext.Provider>
          </Row>
        </Col>
        <Col>
          <div ref={map} id="map"></div>
        </Col>
      </Row>
 
  );
};
export default Map2;
