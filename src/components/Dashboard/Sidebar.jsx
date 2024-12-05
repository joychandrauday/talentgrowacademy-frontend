import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserAlt,
  FaRegFileAlt,
  FaRegMoneyBillAlt,
  FaHistory,
  FaChalkboardTeacher,
  FaLock,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import logo from '../../assets/logo.png';
import { AuthContext } from '../../Provider/AuthProvider';
import logo from "../../assets/logo.png";
import { RxCountdownTimer } from "react-icons/rx";
import { MdRequestPage } from "react-icons/md";
import { AuthContext } from "../../Provider/AuthProvider";

const Sidebar = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Hamburger Menu */}
      <div className="md:hidden flex justify-between items-center p-5">
        <img src={logo} alt="Logo" className="w-16" />
        <button onClick={toggleSidebar} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed rounded-lg top-0 left-0 z-40 bg-white border shadow-md text-primary w-64 p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:block transition-transform duration-300`}
      >
        {/* Close button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-lg absolute top-4 right-4"
        >
          ✖
        </button>

        {/* Logo */}
        <Link to="/" className="logo mb-6 hidden md:block">
          <img src={logo} alt="Logo" />
        </Link>

        {/* User Info Section */}
        <div className="flex justify-start items-center mb-6">
          <img
            src={user?.image || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <div className="text-xl font-semibold">
              {user?.name || "John Doe"}
            </div>
            <div className="text-sm">
              Balance:{" "}
              <span className="font-bold text-xl">

                {user?.balance || "0.00"}

              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 font-semibold">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          {user?.role === "consultant" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/manage-clients"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Manage Clients
                </NavLink>
                <NavLink
                  to="/dashboard/request"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Request
                </NavLink>
                <NavLink
                  to="/dashboard/count"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count
                </NavLink>
                <NavLink
                  to="/dashboard/search"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Search
                </NavLink>
              </div>
            </div>
          )}

          {/* Additional Navigation */}
          {[
            "profile",
            "passbook",
            "withdrawal",
            "reference-history",
            "courses",
            "change-password",
          ].map((path, idx) => (
            <NavLink
              key={idx}
              to={`/dashboard/${path}`}
              className={({ isActive }) =>
                `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
                }`
              }
            >
              {getIconForPath(path)} {capitalize(path.replace("-", " "))}
            </NavLink>
          ))}
          <NavLink
            onClick={logOut}
            className={({ isActive }) =>
              `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
              }`
            }
          >
            <FaSignOutAlt /> Sign out
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

// Utility Functions
const getIconForPath = (path) => {
  switch (path) {
    case "profile":
      return <FaUserAlt />;
    case "passbook":
      return <FaRegFileAlt />;
    case "withdrawal":
      return <FaRegMoneyBillAlt />;
    case "reference-history":
      return <FaHistory />;
    case "courses":
      return <FaChalkboardTeacher />;
    case "change-password":
      return <FaLock />;
    default:
      return null;
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Props validation
Sidebar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    balance: PropTypes.number,
    role: PropTypes.string,
  }).isRequired,
};

export default Sidebar;
