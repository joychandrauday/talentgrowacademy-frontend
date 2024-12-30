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
  FaSearch,
  FaChartBar,
  FaUsers,
  FaCogs,
  FaEdit,
  FaPlusCircle,
  FaUser,
} from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import logo from "../../assets/logo.png";
import { RxCountdownTimer } from "react-icons/rx";
import { MdPending, MdRequestPage } from "react-icons/md";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaUsersGear } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { BiLink, BiTask } from "react-icons/bi";
import { HiCurrencyBangladeshi } from "react-icons/hi2";

const Sidebar = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="">
      {/* Hamburger Menu */}
      <div className="md:hidden flex justify-between items-center p-5">
        <img src={logo} alt="Logo" className="w-16" />
        <button onClick={toggleSidebar} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed min-h-[90vh] rounded-lg top-0 left-0 z-40 bg-white border shadow-md text-primary w-64 p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
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
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <div className="text-xl font-semibold">
              {user?.name}
            </div>
            <div className="text-sm">
              Balance:{" "}
              <span className="font-bold text-xl">
                ৳{user?.balance || "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 font-semibold">
          <NavLink
            to={`/dashboard/${user.role}`}
            className={({ isActive }) =>
              `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>


          {/* admin sidebar navs */}

          {user?.role === "admin" && (
            <div className="ml-4 mt-2 space-y-2">
              <NavLink
                to="/dashboard/admin/add"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaPlusCircle /> Add Role
              </NavLink>
              <NavLink
                to="/dashboard/admin/customize"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaEdit /> Edit Role
              </NavLink>
              <NavLink
                to="/dashboard/admin/manage"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaCogs /> Manage Role
              </NavLink>
              <NavLink
                to="/dashboard/admin/transactions"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <HiCurrencyBangladeshi /> Manage Transactions
              </NavLink>
              <NavLink
                to="/dashboard/admin/users"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaUsers /> Manage Users
              </NavLink>
              <NavLink
                to="/dashboard/admin/teachers"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <GiTeacher /> Manage All Teachers
              </NavLink>
              <NavLink
                to="/dashboard/admin/courses"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <IoBookSharp /> All courses
              </NavLink>
              <NavLink
                to="/dashboard/admin/utilities"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <IoBookSharp /> Utility Functions
              </NavLink>
              <NavLink
                to="/dashboard/admin/books"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <ImBooks /> All Books
              </NavLink>
            </div>
          )}

          {/* controller sidebar navs */}
          {user?.role === "controller" && (
            < div className="ml-4 mt-2 space-y-2">
              <NavLink
                to="/dashboard/controller/consultants"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaUsersGear /> Consultants
              </NavLink>
              <NavLink
                to="/dashboard/controller/request"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <MdPending /> Request List
              </NavLink>
              <NavLink
                to="/dashboard/controller/count"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaChartBar /> Count
              </NavLink>
              <NavLink
                to="/dashboard/controller/search"
                className={({ isActive }) =>
                  `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                <FaSearch /> Search
              </NavLink>
            </div>
          )}
          {/* consultant sidebar navs */}
          {user?.role === "consultant" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/consultant/users"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/consultant/requests"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Request
                </NavLink>

                <NavLink
                  to="/dashboard/consultant/search"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Search
                </NavLink>
                <NavLink
                  to="/dashboard/consultant/count"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count
                </NavLink>

              </div>
            </div>
          )}

          {/* trainer sidebar navs */}
          {user?.role === "trainer" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/trainer/users"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsers /> All users
                </NavLink>
                <NavLink
                  to="/dashboard/trainer/count"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count
                </NavLink>
              </div>
            </div>
          )}

          {/* GL routes */}
          {user?.role === "group-leader" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/group-leader/trainers"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsersGear /> Trainers
                </NavLink>
                <NavLink
                  to="/dashboard/group-leader/users"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsers /> All users
                </NavLink>
                <NavLink
                  to="/dashboard/group-leader/count"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count
                </NavLink>
                <NavLink
                  to="/dashboard/group-leader/count-result"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count Result
                </NavLink>
              </div>
            </div>
          )}

          {/* sgl sidebar navs */}
          {user?.role === "sgl" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/sgl/group-leaders"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsersGear /> Group Leaders
                </NavLink>
                <NavLink
                  to="/dashboard/sgl/users"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsers /> All users
                </NavLink>
                <NavLink
                  to="/dashboard/sgl/search"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <RiUserSearchFill /> Search
                </NavLink>
                <NavLink
                  to="/dashboard/sgl/count"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count
                </NavLink>
                <NavLink
                  to="/dashboard/sgl/count-result"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count Result
                </NavLink>
              </div>
            </div>
          )}
          {/* sgl sidebar navs */}
          {user?.role === "sgl-manager" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/sgl-manager/sgl"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsersGear />Senior Group Leaders
                </NavLink>
                <NavLink
                  to="/dashboard/sgl-manager/group-leaders"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsersGear /> Group Leaders
                </NavLink>
                <NavLink
                  to="/dashboard/sgl-manager/trainer"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <FaUsersGear /> Trainer
                </NavLink>
                <NavLink
                  to="/dashboard/sgl-manager/count"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoMdArrowDropright /> Count
                </NavLink>
              </div>
            </div>
          )}


          {/* teacher manager sidebar navs */}
          {user?.role === "teacher-manager" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/teacher-manager/course"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <ImBooks /> Manage Courses
                </NavLink>
                <NavLink
                  to="/dashboard/teacher-manager/assignments"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <BiTask /> Manage Assignments
                </NavLink>
                <NavLink
                  to="/dashboard/teacher-manager/links"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <BiLink /> Manage Links
                </NavLink>
              </div>
            </div>
          )}

          {/* teacher sidebar navs */}
          {user?.role === "teacher" && (
            <div>
              <div className="ml-4 mt-2 space-y-2">
                <NavLink
                  to="/dashboard/teacher/course"
                  className={({ isActive }) =>
                    `flex gap-4 border  items-center p-2 hover:text-secondary ${isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <ImBooks /> Course
                </NavLink>
              </div>
            </div>
          )}
          <NavLink
            to={'/dashboard/profile'}
            className={({ isActive }) =>
              `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
              }`

            }
          >
            <FaUser /> Profile
          </NavLink>
          {/* Additional Navigation */}
          {user.status === 'active' && (
            <>
              <NavLink
                to="/dashboard/passbook"
                className={({ isActive }) =>
                  `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
                  }`
                }
              >
                {getIconForPath("passbook")} Passbook
              </NavLink>
              <NavLink
                to="/dashboard/withdrawal"
                className={({ isActive }) =>
                  `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
                  }`
                }
              >
                {getIconForPath("withdrawal")} Withdrawal
              </NavLink>
              {
                user.role === 'user' ? <> <NavLink
                  to="/dashboard/reference-history"
                  className={({ isActive }) =>
                    `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
                    }`
                  }
                >
                  {getIconForPath("reference-history")} Reference History
                </NavLink>
                  <NavLink
                    to="/dashboard/courses"
                    className={({ isActive }) =>
                      `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
                      }`
                    }
                  >
                    {getIconForPath("courses")} Courses
                  </NavLink></> : ''
              }
              <NavLink
                to="/dashboard/change-password"
                className={({ isActive }) =>
                  `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : ""
                  }`
                }
              >
                {getIconForPath("change-password")} Change Password
              </NavLink>
            </>
          )}


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
      </div >

      {/* Overlay for mobile */}
      {
        isOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          ></div>
        )
      }
    </div >
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
