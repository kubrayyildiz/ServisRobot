import React, { useRef, useEffect, useState } from "react";
import * as Three from "three";
import * as ROS2D from "ros2d";
import * as ROSLIB from "roslib";
import createjs from "createjs-module";
import goal from "../scripts/goal.png";
import robot from "../scripts/robot.png";
import charging_station from "../scripts/charging_station.png";
import getYawFromQuat from "../scripts/getY";
const Map = (props) => {
  var gridClient;
  var robot_image;
  var viewer;
  var canvas;
  var context;
  var trace_shape;
  var global_path_image;
  var local_path_image;
  var goal_image;
  var panView;
  var mouseDown = false;
  var zoomKey = false;
  var panKey = false;
  var dbclick = false;
  var clickedPolygon = false;
  var selectedPointIndex = null;
  var charging_station_param = null;
  var cahrging_station_image1 = null;
  var cahrging_station_image2 = null;
  const map = useRef(null);
  const [points, setpoints] = useState(null);
  var startPos = new ROSLIB.Vector3();
  const ros = props.ros;
  const type = null;

  useEffect(() => {
    view_map();
    map.current.style.pointerEvents = "null";
    map.current.children[0].id = "canvas";
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.fillStyle = "#FF";
  }, []);
  function charging_stations1() {
    cahrging_station_image1.x = charging_station_param.position.x;
    cahrging_station_image1.y = -charging_station_param.position.y;
    cahrging_station_image1.rotation = (-getYawFromQuat(
      charging_station_param.orientation
    )).toFixed(2);
  }
  function charging_stations2() {
    cahrging_station_image2.x = charging_station_param.position.x;
    cahrging_station_image2.y = -charging_station_param.position.y;
    cahrging_station_image2.rotation = (-getYawFromQuat(
      charging_station_param.orientation
    )).toFixed(2);
  }

  function render_elments() {
    let polygon_zone = [];
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
        trace_shape.addPose(message);
      });
    });
    var trace_Shape = new ROSLIB.Topic({
      ros: ros,
      name: "/move_base/feedback",
      messageType: "/move_base_msgs/MoveBaseActionFeedback",
    });
    trace_Shape.subscribe(function (message) {
      trace_shape.addPose(message.feedback.base_position.pose);
    });
    var zone = new ROSLIB.Topic({
      ros: ros,
      name: "/zones",
      messageType: "/mir_msgs/Zone",
    });
    zone.subscribe((message) => {
      let logic = false;
      for (let i = 0; i < polygon_zone.length; i++) {
        if (polygon_zone[i].zone_id === message.zone_id) {
          logic = true;
          break;
        }
      }
      if (!logic) {
        polygon_zone.push(message);
      }
    });
    var ros_station_param1 = new ROSLIB.Param({
      ros: ros,
      name: "/station1",
    }).get((param) => {
      charging_station_param = param;
      charging_stations1();
    });
    ros_station_param1 = new ROSLIB.Param({
      ros: ros,
      name: "/station2",
    }).get((param) => {
      charging_station_param = param;
      charging_stations2();
    });

    var local_path = new ROSLIB.Topic({
      ros: ros,
      name: "/move_base_node/DWBLocalPlanner/local_plan",
      messageType: "nav_msgs/Path",
    });
    local_path.subscribe((message) => {
      local_path_image.setPath(message);
    });
    var global_path = new ROSLIB.Topic({
      ros: ros,
      name: "/move_base_node/DWBLocalPlanner/global_plan",
      messageType: "nav_msgs/Path",
    });
    global_path.subscribe((message) => {
      global_path_image.setPath(message);
    });
    robot_image = new ROS2D.NavigationImage({
      size: 1.1,
      image: robot,
      pulse: false,
      alpha: 0.9,
    });
    robot_image.x = 10;
    robot_image.y = -10;
    global_path_image = new ROS2D.PathShape({
      strokeSize: 0.03,
      strokeColor: createjs.Graphics.getRGB(0, 0, 0),
    });
    goal_image = new ROS2D.NavigationImage({
      size: 0.8,
      image: goal,
      alpha: 1,
      pulse: false,
    });
    trace_shape = new ROS2D.TraceShape({
      strokeSize: 0.3,
      maxPoses: 20,
      minDist: 0.03,
      strokeColor: createjs.Graphics.getRGB(255, 0, 0, 0.6),
    });
    local_path_image = new ROS2D.PathShape({
      strokeSize: 0.3,
      strokeColor: createjs.Graphics.getRGB(0, 0, 250, 0.6),
    });
    cahrging_station_image1 = new ROS2D.NavigationImage({
      size: 1.4,
      image: charging_station,
      alpha: 1,
      pulse: false,
    });
    cahrging_station_image2 = new ROS2D.NavigationImage({
      size: 1.4,
      image: charging_station,
      alpha: 1,
      pulse: false,
    });
    cahrging_station_image1.x = -200;
    cahrging_station_image1.y = -200;
    cahrging_station_image2.x = -200;
    cahrging_station_image2.y = -200;
    goal_image.x = -200;
    goal_image.y = -200;
    viewer.scene.addChild(cahrging_station_image1);
    viewer.scene.addChild(cahrging_station_image2);
    viewer.scene.addChild(global_path_image);
    viewer.scene.addChild(local_path_image);
    viewer.scene.addChild(trace_shape);

    var goal_subscriber = new ROSLIB.Topic({
      ros: ros,
      name: "/move_base_node/current_goal",
      messageType: "geometry_msgs/PoseStamped",
    }).subscribe((message) => {
      function getRotation() {
        var quat = new Three.Quaternion(
          message.pose.orientation.x,
          message.pose.orientation.y,
          message.pose.orientation.z * -1,
          message.pose.orientation.w
        );
        var yaw = new Three.Euler().setFromQuaternion(quat);
        return yaw["_z"] * (180 / Math.PI);
      }
      // console.log(yaw);
      goal_image.x = message.pose.position.x;
      goal_image.y = -message.pose.position.y;
      goal_image.rotation = getRotation();
      viewer.scene.addChild(goal_image);
      viewer.scene.addChild(robot_image);
    });
  }

  function view_map() {
    if (map.current.innerHTML !== "") return;
    viewer = new ROS2D.Viewer({
      divID: "map",
      width: 800,
      height: 550,
    });
    gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      continuous: true,
    });
    panView = new ROS2D.PanView({
      rootObject: viewer.scene,
    });

    gridClient.on("change", () => {
      viewer.scaleToDimensions(
        gridClient.currentGrid.width,
        gridClient.currentGrid.height,
        viewer.scaleToDimensions(
          gridClient.currentGrid.width,
          gridClient.currentGrid.height
        )
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

  return <div ref={map} id="map"></div>;
};
export default Map;
