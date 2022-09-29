import * as ROSLIB from "roslib";
import React, { useState, useEffect } from "react";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import "../Css/DefaultDashboard.css";
import { Container, Row, Col } from "react-bootstrap";
const Robot = (props) => {
  const ros = props.ros;
  const [icon, setIcon] = useState(null);
  const [robot_serial_number, setrobot_serial_number] = useState("");
  const [robot_model_name, setrobot_model_name] = useState("");
  const [battery_percentege, setbattery_percentege] = useState(0.0);
  const [battery_remaining_time, setbattery_remaining_time] = useState(0.0);
  const [battery_remaining_distance, setbattery_remaining_distance] =
    useState(0);
  const [uptime, setuptime] = useState(0);
  const [distance_traveled, setdistance_traveled] = useState(0.0);
  var h1;
  var m1;
  var s1;
  var h;
  var m;
  var s;

  useEffect(() => {
    var robot = new ROSLIB.Topic({
      ros: ros,
      name: "/robot_state",
      messageType: "robot/RobotState",
    });
    robot.subscribe((message) => {
      h1 = message.battery_remaining_time / 3600;
      m1 = (h1 % 1) * 60;
      s1 = (m1 % 1) * 60;
      h = message.uptime / 3600;
      m = (h % 1) * 60;
      s = (m % 1) * 60;

      setrobot_serial_number(message.robot_serial_number); //string
      setrobot_model_name(message.robot_model_name); // string
      if (message.battery_percentege === 100) {
        setIcon(B100);
      } else if (message.battery_percentege > 80) {
        setIcon(Bch);
      } else if (message.battery_percentege > 75) {
        setIcon(B75);
      } else if (message.battery_percentege  > 50){
        setIcon(B50);
      }
     else if (message.battery_percentege >25){
      setIcon(B25);
    }
    else{
      setIcon(B0);
    }
      setbattery_percentege(message.battery_percentege.toFixed(0) + "%" + "  "); // percentege

      setbattery_remaining_time(
        h1.toFixed(0) + " : " + m1.toFixed(0) + " : " + s1.toFixed(0)
      ); // secound
      setbattery_remaining_distance(
        (message.battery_remaining_distance / 1000).toFixed(3) + " " + "[Km]"
      ); //
      setuptime(h.toFixed(0) + " : " + m.toFixed(0) + " : " + s.toFixed(0));
      setdistance_traveled(
        (message.distance_traveled / 1000).toFixed(3) + " " + "[Km]"
      );
    });
  }, [ros]);

  return (
    <div id="robotstatue">
      <Container>
        <div>
          <h2>
            Robot Statue <p className="battery">
            {battery_percentege}
            {icon}
           </p>
            </h2>
        </div>

        <div>
          <br />
        </div>
        <Row>
          <Col>
            <h5> Model </h5>
          </Col>
          <Col>
            <h5>{robot_model_name}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Serial Number</h5>
          </Col>
          <Col>
            <h5>{robot_serial_number}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Battery Remaining Time </h5>
          </Col>
          <Col>
            {" "}
            <h5>{battery_remaining_distance} </h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Battery Remaining Time </h5>
          </Col>
          <Col>
            {" "}
            <h5>{battery_remaining_time}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>UpTime </h5>
          </Col>
          <Col>
            <h5>{uptime}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Traveled Distance </h5>
          </Col>
          <Col>
            <h5>{distance_traveled}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Robot;
