import Robot from "../components/Robot";
import MapDashboard from "../components/MapDashboard";
import ParamScreen from "../components/ParamScreenDashboard";
import "../Css/DefaultDashboard.css";

const DefaultDashboard = (props) => {
  return (
    <div className="container2" >
      <div className="robot">
        <Robot ros={props.ros} />
      </div>
      <div class="vr2"></div>
      <div className="paramscreen">
        {" "}
        <ParamScreen ros={props.ros} />
      </div>

      <div class="vr3"></div>

      <div className="map">
        {" "}
        <MapDashboard ros={props.ros} />
      </div>
    </div>
  );
};

export default DefaultDashboard;
