import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImUsers,ImParagraphJustify } from "react-icons/im";
import {MdOutlineDashboardCustomize} from "react-icons/md";
import { useState } from "react";
import { GiAutoRepair,GiPositionMarker } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarmenu";
import "../App.css";

const routes = [
  {
    path: "/",
    name: "Dashboards",
    icon: <AiOutlineDashboard size={25}/>,
    subRoutes: [
      {
        path: "/Dashboards/DefaultDashboard",
        name: "Default Dashboard ",
        icon: <MdOutlineDashboardCustomize size={25}/>,
      },
    ],
  },

  {
    path: "/setup",
    name: "Setup",
    icon: <GiAutoRepair size={25}/>,
    subRoutes: [
      {
        path: "/setup/PositionMarker",
        name: "Position Marker",
        icon: <GiPositionMarker size={25}/>,
        },
        {
          path:  "/setup/robotparameters",
          name: "Robot Parameters",
           icon: <ImParagraphJustify size={25}/>,
        },
      {
        path: "/setup/Users",
        name: "Users ",
        icon: <ImUsers size={25}/>,
      },
    ],
  },
 
    {
      path: "/Logout",
      name: "Logout",
      icon: <HiOutlineLogout size={25}/>,}
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "15%" : "3%",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Epik Robotik
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
