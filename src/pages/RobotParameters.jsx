import ParamScreen from "../components/ParamScreen";
import "../Css/RobotParameters.css";

const RobotParameters = (props) => {
  return (
    <div className="container2">
     <div className="RobotParameters">
        <ParamScreen ros={props.ros} />
     </div>
    </div>
  );
};

export default RobotParameters;
