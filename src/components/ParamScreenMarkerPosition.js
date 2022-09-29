import ParamButtonPosition from "./ParamButtonPosition";
import * as ROSLIB from "roslib";
import React, { useEffect, useState } from "react";

function ParamScreen2(props) {
  const ros = props.ros;
  const params = props.param;
  const [NumberOfPositionMarkers, setNumberOfPositionMarkers] = useState(0);
  let content = []; //birden fazla sayfayı for döngüsü içinde yazıldı.
  for (let i = 0; i <NumberOfPositionMarkers; i++) {
    content.push(
        <ParamButtonPosition ros={ros} paramName={"PositionMarker"+String(i+1)}>
          {" "}
        </ParamButtonPosition>
      
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
        {content}
      </div>
    );
  }


export default ParamScreen2;
