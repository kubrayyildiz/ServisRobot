import ParamScreen2 from "../components/ParamScreenMarkerPosition";
import "../Css/MarkerPosition.css";
import MapPositionMarker from "../components/MapPositionMarker";

const PositionMarker = (props) => {
  return (
    <div className="container2">
      <div className="paramscreen2">
        <ParamScreen2 ros={props.ros} />
      </div>
      <div class="vr"></div>
      <div className="map2">
        <MapPositionMarker ros={props.ros} />
      </div>
    </div>
  );
};

export default PositionMarker;
