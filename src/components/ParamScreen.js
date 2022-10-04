import ParamRow from "./ParamRow";
import * as ROSLIB from "roslib";
import React, { useEffect, useState } from "react";
import { Col, Container,Row } from "react-bootstrap";
import "../Css/RobotParameters.css";

function ParamScreen(props) {
  const ros = props.ros;
  const params = props.param;
  const [charge_params, setcharge_params] = useState(0);

  let content = []; //birden fazla sayfayı for döngüsü içinde yazıldı.
  for (let i = 0; i < charge_params.length; i++) {
    const item = charge_params[i];
    content.push(
      <Row className="parameters">
        <ParamRow ros={ros} paramName={charge_params[i]}>
          {" "}
        </ParamRow>
      </Row>
    );
  }

  useEffect(() => {
    var paramCharge = new ROSLIB.Param({
      ros: ros,
      name: "charge_params",
    });
    paramCharge.get((charge_params) => {
      console.log(charge_params);
      setcharge_params(charge_params);
     
    });
  }, []);

  if (charge_params[0] == undefined) {
    return <div></div>;
  } else {
    return (
    <Container >
          <Row className="title2 ">
            <Col className="title3">Charge Params</Col>
            <Col>Description</Col>
            <Col>Value</Col>
            <Col>Action</Col>
          </Row>
         
          <Row>{content}</Row>
        
        </Container>
    );
  }
}

export default ParamScreen;
