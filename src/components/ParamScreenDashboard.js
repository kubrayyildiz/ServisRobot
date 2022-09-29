import ParamButtonDashboard from "./ParamButtonDashboard";
import * as ROSLIB from "roslib";
import React, { useEffect, useState } from "react";

function ParamScreen(props) {
  const ros = props.ros;
  const params = props.param;
  const [NumberOfPositionMarkers, setNumberOfPositionMarkers] = useState(0);
  let content = []; //birden fazla sayfayı for döngüsü içinde yazıldı.
  for (let i = 0; i <NumberOfPositionMarkers; i++) {
    content.push(
        <ParamButtonDashboard ros={ros} paramName={"PositionMarker"+String(i+1)}>
          {" "}
        </ParamButtonDashboard>
      
    );
  }
  useEffect(() => {
    var NumberOfPositionMarkersParam = new ROSLIB.Param({
      ros: ros,
      name: "NumberOfPositionMarkers",
    });
    NumberOfPositionMarkersParam.get((value) => {
      console.log(value);
      setNumberOfPositionMarkers(value);
     
    });
  }, []);

  
    return (
      <div>
        <h2>Param Screen</h2>
        {content}
      </div>
    );
  }


export default ParamScreen;
