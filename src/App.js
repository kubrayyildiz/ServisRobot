import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Logout from"./pages/Logout";
import ManualJoystick from "./components/ManualJoystick";
import PositionMarker from "./pages/PositionMarker";
import RobotParameters from "./pages/RobotParameters";
function App() {
  return (
    <div>
  
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/logout" element={<Logout />} /> 
          <Route path="Dashboards/DefaultDashboard" element={<Home />} />
          <Route path="/Joystick" element={<ManualJoystick />} />
          <Route path="Setup/PositionMarker" element={<PositionMarker />} /> 
          <Route path="Setup/RobotParameters" element={<RobotParameters />} /> 
          <Route path="/SideBar" element={<SideBar />} />
          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
      </Router>

      </div>
  );
}

export default App;
