import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Others/Home/Home";
import Courses from "../pages/Others/Courses/Courses";
import About from "../pages/Others/About/About";
import Contact from "../pages/Others/Contact/Contact";
import Login from "../pages/Others/Login/Login";
import Register from "../pages/Others/Register/Register";
import Career from "../pages/Others/Career/Career";
import TermsCondition from "../pages/Others/Utilitiy-Pages/TermsCondition";
import PrivacyPolicy from "../pages/Others/Utilitiy-Pages/PrivacyPolicy";
import CookiePolicy from "../pages/Others/Utilitiy-Pages/Cookie-policy";
import Dashboard from "../layouts/Dashboard";
import DashboardHolder from "../pages/Dashboard/DashboardHome/DashboardHolder";
import Passbook from "../pages/Dashboard/DashboardCommon/Passbook";
import Profile from "../pages/Dashboard/DashboardCommon/Profile";
import Withdrawal from "../pages/Dashboard/DashboardCommon/Withdrawal";
import ReferenceHistory from "../pages/Dashboard/DashboardCommon/ReferenceHistory";
import CoursesDash from "../pages/Dashboard/DashboardCommon/CoursesDash";
import ChangePass from "../pages/Dashboard/DashboardCommon/ChangePass";
import Departments from "../pages/Others/Departments/Departments";
import ConsultantUserManagement from "../pages/Dashboard/DashboardRoleWise/Consultant/ConsultantUserManagement";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/Dashboard/DashboardRoleWise/Admin/AdminDashboard";
import AddUser from "../components/Dashboard/AdminComponent/AddUser";
import EditUser from "../components/Dashboard/AdminComponent/EditUser";
import ManageAdminstration from "../components/Dashboard/AdminComponent/ManageAdminstration";
import ControllerDashboard from "../pages/Dashboard/DashboardRoleWise/Controller/ControllerDashboard";
import UserManagementTable from "../components/Dashboard/UserManagementTable";
import ControllerUserManage from "../pages/Dashboard/DashboardRoleWise/Controller/ControllerUserManage";
import ControllerCount from "../pages/Dashboard/DashboardRoleWise/Controller/ControllerCount";
import ProfileSearch from "../components/Others/ProfileSearch";
import AllUserManagement from "../components/Others/AllUserManagement";

import { CoursesDetails } from "../pages/Others/Courses/CoursesDetails";

import TrainerDashboard from "../pages/Dashboard/DashboardRoleWise/Trainer/TrainerDashboard";
import TrainerUserManagement from "../pages/Dashboard/DashboardRoleWise/Trainer/TrainerUserManagement";
import GroupLeaderDashboard from "../pages/Dashboard/DashboardRoleWise/GroupLeader/GroupLeaderDashboard";
import GroupLeaderUserManagement from "../pages/Dashboard/DashboardRoleWise/GroupLeader/GroupLeaderUserManagement";
import GroupLeaderTrainerManagement from "../pages/Dashboard/DashboardRoleWise/GroupLeader/GroupLeaderTrainerManagement";
import SeniorGroupLeaderDashboard from "../pages/Dashboard/DashboardRoleWise/SeniorGroupLeader/SeniorGroupLeaderDashboard";
import SGLglManagement from "../pages/Dashboard/DashboardRoleWise/SeniorGroupLeader/SGLglManagement";
import SGLUserManagement from "../pages/Dashboard/DashboardRoleWise/SeniorGroupLeader/SGLUserManagement";
import ControllerConsultantManagement from "../pages/Dashboard/DashboardRoleWise/Controller/ControllerConsultantManagement";
import ControllerSingleConsultant from "../pages/Dashboard/DashboardRoleWise/Controller/ControllerSingleConsultant";
import TeacherDashboard from "../pages/Dashboard/DashboardRoleWise/Teacher/TeacherDashboard";
import TeacherCourses from "../pages/Dashboard/DashboardRoleWise/Teacher/TeacherCourses";
import AdminAllBoookManagement from "../pages/Dashboard/DashboardRoleWise/Admin/AdminAllBoookManagement";
import AdminAllCourseManagementt from "../pages/Dashboard/DashboardRoleWise/Admin/AdminAllCourseManagementt";
import AdminAllTeacherManagement from "../pages/Dashboard/DashboardRoleWise/Admin/AdminAllTeacherManagement";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path:"/courses/:_id",
        element:<CoursesDetails/>,
        loader:({params})=>fetch(`https://talentgrowacademy-backend.vercel.app/courses/${params._id}`)
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/career",
        element: <Career />
      },
      {
        path: "/departments",
        element: <Departments />
      },
      {
        path: "/terms",
        element: <TermsCondition />
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/cookies",
        element: <CookiePolicy />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },


    ],
  },
  // dashboard routes
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      {
        path: "",
        element: <DashboardHolder />,
      },
      // common routes
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "passbook",
        element: <Passbook />,
      },
      {
        path: "withdrawal",
        element: <Withdrawal />,
      },
      {
        path: "reference-history",
        element: <ReferenceHistory />,
      },
      {
        path: "courses",
        element: <CoursesDash />,
      },
      {
        path: "change-password",
        element: <ChangePass />,
      },
      //role based routes
      {
        path: "manage-clients",
        element: <ConsultantUserManagement />,
      },
      //admin rooutes
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "",
            element: <AllUserManagement />
          },
          {
            path: "add",
            element: <AddUser />
          },
          {
            path: "customize",
            element: <EditUser />
          },
          {
            path: "manage",
            element: <ManageAdminstration />
          },
          {
            path: "users",
            element: <AllUserManagement />
          },
          {
            path: "teachers",
            element: <AdminAllTeacherManagement />
          },
          {
            path: "books",
            element: <AdminAllBoookManagement />
          },
          {
            path: "courses",
            element: <AdminAllCourseManagementt />
          },
        ]
      },
      {
        path: "controller",
        element: <ControllerDashboard />,
        children: [
          {
            path: "consultants",
            element: <ControllerConsultantManagement />
          },
          {
            path: "consultant/:userID",
            element: <ControllerSingleConsultant />
          },
          {
            path: "users",
            element: <ControllerUserManage />
          },
          {
            path: "count",
            element: <ControllerCount />
          },
          {
            path: "search",
            element: <ProfileSearch />
          }
        ]
      },
      {
        path: "group-leader",
        element: <GroupLeaderDashboard />,
        children: [
          {
            path: "trainers",
            element: <GroupLeaderTrainerManagement />
          },
          {
            path: "users",
            element: <GroupLeaderUserManagement />
          },
          {
            path: "count",
            element: <ControllerCount />
          },
          {
            path: "count-result",
            element: <ControllerCount />
          }
        ]
      },
      //trainer routes
      {
        path: "sgl",
        element: <SeniorGroupLeaderDashboard />,
        children: [
          {
            path: "group-leaders",
            element: <SGLglManagement />
          },
          {
            path: "users",
            element: <SGLUserManagement />
          },
          {
            path: "count",
            element: <ControllerCount />
          },
          {
            path: "search",
            element: <ProfileSearch />
          }
        ]
      },
      {
        path: "trainer",
        element: <TrainerDashboard />,
        children: [
          {
            path: "users",
            element: <TrainerUserManagement />
          },
          {
            path: "count",
            element: <ControllerCount />
          },
        ]
      },
      {
        path: "teacher",
        element: <TeacherDashboard />,
        children: [
          {
            path: "course",
            element: <TeacherCourses />
          },
        ]
      },
      // Group Leader
    ]
  }


]);
