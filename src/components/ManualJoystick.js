import React, {  } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/Config";
import * as ROSLIB from "roslib";
import { useContext } from "react";
import { PositionContext } from "./PositionContext";
import { Container } from "react-bootstrap";
import "../Css/DefaultDashboard.css";
const ManualJoystick = (props) => {
  const ros = props.ros;
  const data = useContext(PositionContext);
  console.log(data);
  function handleMove() {
    console.log("handle move");
    var cmd_vel = new ROSLIB.Topic({
      ros: ros,
      name: Config.CMD_VEL_TOPIC,
      messageType: "geometry_msgs/Twist",
    });
    var twist = new ROSLIB.Message({
      linear: {
        x: props.y / 80,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -props.x / 80,
      },
    });
    cmd_vel.publish(twist);
  }
  function handleStop() {
    console.log("handle stop");
    var cmd_vel = new ROSLIB.Topic({
      ros: ros,
      name: Config.CMD_VEL_TOPIC,
      messageType: "geometry_msgs/Twist",
    });
    var twist = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
    cmd_vel.publish(twist);
  }

  return (
    <div>
      <main className="joystick">
        <Container>
          <center>
            <Joystick
              size={120}
              sticky={false}
              baseColor="#add8e6"
              stickColor="#4169e1"
              move={handleMove}
              stop={handleStop}
            ></Joystick>
          </center>
        </Container>
      </main>
    </div>
  );
};

export default ManualJoystick;
