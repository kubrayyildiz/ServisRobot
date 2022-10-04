import * as ROSLIB from "roslib";
import React, { useEffect, useState, useRef } from "react";
import { IconButton } from "rsuite";
import "../Css/RobotParameters.css";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const ParamRow = (props) => {
  const ros = props.ros;
  var paramName = props.paramName;
  console.log(paramName);
  const [value, setvalue] = useState(0);
  const [description, setdescription] = useState(0);
  const [isEdit, setisEdit] = useState(false);
  const input = useRef(null);
  useEffect(() => {
    var paramDesc = new ROSLIB.Param({
      ros: ros,
      name: paramName, //+ "/description",
    });
    paramDesc.get((value) => {
      setdescription(value.description);
      setvalue(value.value);
    });
  }, []);

  function edit() {
    setisEdit(true);
    input.current.value = value;
  }
  function save() {
    setisEdit(false);
    setvalue(Number(input.current.value));
    var paramValue = new ROSLIB.Param({
      ros: ros,
      name: paramName + "/value",
    });
    paramValue.set(Number(input.current.value));
  }
  function cancel() {
    setisEdit(false);
    paramName.set(Number(input.current.value));
  }

  return (
  
    <Row >
       
      <Col>
        <p >{paramName}</p>
      </Col>

      <Col className="description">
        <p>{description}</p>
      </Col>
      {!isEdit && (
        <Col>
          <p  className="value">{value}</p>
        </Col>
      )}
      {isEdit && (
        <Col>
          {" "}
          <input className="input" ref={input} type="text" name={value} placeholder={value} />
        </Col>
      )}

      {!isEdit && (
        <Col>
          <IconButton className="a" icon={<FaEdit size={25}/>} onClick={edit}></IconButton>
        </Col>
      )}
      {isEdit && (
        <Col>
          <IconButton className="b"   icon={<FaSave size={25} />} onClick={save}></IconButton>
          <IconButton className="c" icon={<MdCancel size={25} />} onClick={cancel}></IconButton>
        </Col>
      )}
      <hr/>
    </Row>
  );
};

export default ParamRow;
