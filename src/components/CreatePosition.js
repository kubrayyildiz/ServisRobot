import { useState, useContext } from "react";
import React from "react";
import { PositionContext } from "./PositionContext";
import { Modal, Button, Form } from "react-bootstrap";
import "../Css/MarkerPosition.css";
import * as ROSLIB from "roslib";

function CreatePosition(props) {
  const ros = props.ros;
  const data = useContext(PositionContext);
  const [x_, setx_] = useState(data.click_position.x);
  const [y_, sety_] = useState(data.click_position.y);
  const [rotation_, setrotation_] = useState(data.click_position.rotation);
  const [name_, setname_] = useState("");

  function save() {
    var client = new ROSLIB.Service({
      ros: ros,
      name: "/add_position_marker",
      serviceType: "amr_services/AddPositionMarker",
    });

    var request = new ROSLIB.ServiceRequest({
      position: {
        position: {
          x: parseFloat(x_),
          y: parseFloat(y_),
        },
      },
      rotation: parseFloat(rotation_),
      marker_name: name_,
    });

    client.callService(request, function (result) {
      console.log(result);
    });

    data.setisoverlayShown(false);
    data.Enable();
  }

  function get_robot_position() {
    setx_(data.robot_position.x);
    sety_(data.robot_position.y);
    setrotation_(data.robot_position.rotation);
  }

  return (
    <div>
      <Modal show={true} title="Create position" >
        <Modal.Header>
          <Modal.Title>Create Position</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="positionName">
              <Form.Label> Position Name:</Form.Label>

              <Form.Control
                required
                type="text"
                name="Position Name"
                value={name_}
                onChange={(e) => {
                  setname_(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PositionX">
              <Form.Label> Position X:</Form.Label>

              <Form.Control
                required
                type="text"
                name="PositionX"
                value={x_}
                onChange={(e) => {
                  setx_(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PositionY">
              <Form.Label> Position Y:</Form.Label>

              <Form.Control
                required
                type="text"
                name="PositionY"
                value={y_}
                onChange={(e) => {
                  sety_(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="positionRotation">
              <Form.Label> Position Rotation:</Form.Label>

              <Form.Control
                required
                type="text"
                name="PositionY"
                value={rotation_}
                onChange={(e) => {
                  setrotation_(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="button1"
            onClick={() => {
              data.setisoverlayShown(false);
              data.Enable();
              console.log("cancelling");
            }}
          >
            Close
          </Button>
          <Button
            id="button2"
            onClick={() => {
              save();
              console.log("Saved");
            }}
          >
            Save Changes
          </Button>
          <Button
            id="button2"
            onClick={() => {
              get_robot_position();
              // props.Enable();
            }}
          >
            Get Robot Position{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CreatePosition;
