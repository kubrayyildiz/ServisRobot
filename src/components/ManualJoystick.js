import React, { useState, useEffect } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/Config";
import * as ROSLIB from "roslib";
import { Container } from "react-bootstrap";
import "../Css/DefaultDashboard.css";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { IoArrowRedoCircle, IoArrowUndoCircle } from "react-icons/io5";

const ManualJoystick = (props) => {
  const ros = props.ros;
  const [x, setX] = useState("");
  const [z, setZ] = useState("");

  async function sendJoystickAPI(x, z) {
    try {
      const response = await fetch(
        "http://127.0.0.1:5050/api/v1/ros/joystick/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x,
            z,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  //   sendJoystickAPI(1, 0);
  // }

  // function goDown() {
  //   sendJoystickAPI(-1, 0);
  // }

  // function turnLeft() {
  //   sendJoystickAPI(0, -1);
  // }

  // function turnRight() {
  //   sendJoystickAPI(0, 1);
  // }

  const handleMove = async (e) => {
    console.log(e);
    sendJoystickAPI(e.y, -e.x); // linear x  --- angular z
  //   if () {
  //     sendJoystickAPI(e.y, -e.x); // linear x  --- angular z
  //   }
  //   else{

  //   }
  };

  const handleStop = async (e) => {
    sendJoystickAPI(0, 0);
  };
  return (
    <div>
      <main className="joystick">
        <Container>
          <div className="up">
            <BsFillArrowUpSquareFill
              size={30}
              onClick={() => sendJoystickAPI(1, 0)}
              icon={BsFillArrowUpSquareFill}
            />
          </div>
          <div className="arrow">
            <IoArrowRedoCircle
              size={40}
              icon={IoArrowRedoCircle}
              onClick={() => sendJoystickAPI(0, 1)}
            />
          </div>
          <div className="joystick2">
            <Joystick
              size={120}
              sticky={false}
              baseColor="#add8e6"
              stickColor="#4169e1"
              move={handleMove}
              stop={handleStop}
            ></Joystick>
          </div>
          <div className="down">
            <BsFillArrowDownSquareFill
              size={30}
              onClick={() => sendJoystickAPI(-1, 0)}
              icon={BsFillArrowDownSquareFill}
            />
          </div>
          <div className="arrow2">
            <IoArrowUndoCircle
              size={40}
              onClick={() => sendJoystickAPI(0, -1)}
              icon={IoArrowUndoCircle}
            />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default ManualJoystick;
