import React, { Component } from "react";
import * as ROSLIB from "roslib";
import Config from "../scripts/Config";
import Header from "../components/Header";
import PositionMarker from "../pages/PositionMarker";
import DefaultDashboard from "../pages/DefaultDashboard";
import RobotParameters from "../pages/RobotParameters";
import { Route } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";

class Home extends Component {
  state = { ros: null };
  constructor() {
    super();
    this.init_connection();
  }
  connect() {
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log(error);
    }
  }
  init_connection() {
    this.state.ros = new ROSLIB.Ros();
    this.state.ros.on("connection", () => {
      this.setState({ connected: true });
      console.log("bağlandı");
    });
    this.state.ros.on("close", () => {
      this.setState({ connected: false });
      setTimeout(() => {
        this.connect();
      }, Config.RECONNECTION_TIMEOUT * 1000);
    });
    this.connect();
    console.log("ros home: " + this.state.ros);

  }
  render() {
    return (
      <div>
        <Header ros={this.state.ros} />
        <RobotParameters ros={this.state.ros} />
      </div>
    );
  }
}

export default Home;
