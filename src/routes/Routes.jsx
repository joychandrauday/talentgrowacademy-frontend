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
import RequestConsultant from "../pages/Dashboard/DashboardRoleWise/Consultant/RequestUserConsultant";
import ControllerRequest from "../pages/Dashboard/DashboardRoleWise/Controller/ControllerRequest";
import Count from "../components/Shared/Count";
import UserDashboard from "../pages/Dashboard/DashboardHome/UserDashboard";
import TeacherManagerTeacherManage from "../pages/Dashboard/DashboardRoleWise/TeacherManager/TeacherManagerTeacherManage";
import TeacherManagerCourseManageMent from "../pages/Dashboard/DashboardRoleWise/TeacherManager/TeacherManagerCourseManageMent";
import TeacherManagerUtility from "../pages/Dashboard/DashboardRoleWise/TeacherManager/TeacherManagerUtility";
import AdminUtilities from "../pages/Dashboard/DashboardRoleWise/Admin/AdminUtilities";
import CountResult from "../components/Shared/CountResult";
import CourseDetailed from "../pages/Dashboard/DashboardCommon/CourseDetailed";
import TeacherManagerAssignments from "../pages/Dashboard/DashboardRoleWise/TeacherManager/TeacherManagerAssignments";
import SGLManagerDashboard from "../pages/Dashboard/DashboardRoleWise/SGLManager/SGLManagerDashboard";
import ManageTransactions from "../pages/Dashboard/DashboardRoleWise/Admin/ManageTransactions";
import ManageWithdrawal from "../pages/Dashboard/DashboardRoleWise/Admin/ManageWithdrawal";
import MoneyAllocation from "../pages/Dashboard/DashboardRoleWise/Admin/MoneyAllocation";
import SglManagerUserManagement from "../pages/Dashboard/DashboardRoleWise/SGLManager/SglManagerUserManagement";
import SglManagerGlManager from "../pages/Dashboard/DashboardRoleWise/SGLManager/SglManagerGlManager";
import SglManagerSglManagement from "../pages/Dashboard/DashboardRoleWise/SGLManager/SglManagerSglManagement";
import SglManagerTrainerManageMent from "../pages/Dashboard/DashboardRoleWise/SGLManager/SglManagerTrainerManageMent";
import ConsultantManagerUserManagement from "../pages/Dashboard/DashboardRoleWise/ConsultantManager/ConsultantManagerUserManagement";
import ConsultantManagerConsultantManagement from "../pages/Dashboard/DashboardRoleWise/ConsultantManager/ConsultantManagerConsultantManagement";
import ConsultantManagerCount from "../pages/Dashboard/DashboardRoleWise/ConsultantManager/ConsultantManagerCount";
import ConsultantManagerCountResult from "../pages/Dashboard/DashboardRoleWise/ConsultantManager/ConsultantManagerCountResult";
import SGLManagerCount from "../pages/Dashboard/DashboardRoleWise/SGLManager/SGLManagerCount";
import ConsultantManagerDashboard from "../pages/Dashboard/DashboardRoleWise/ConsultantManager/ConsultantManagerDashboard";
import AdminRoute from "./AdminRoute";
import AdminCount from "../pages/Dashboard/DashboardRoleWise/Admin/AdminCount";
import BookSection from "../components/HomeComponents/BookSection";
import SingleBook from "../components/HomeComponents/SingleBook";
import AllBooks from "../components/HomeComponents/AllBooks";
import ManageEvents from "../components/Dashboard/AdminComponent/ManageEvents";
import AllEvents from "../pages/Others/Events/AllEvents";
import SingleEvent from "../pages/Others/Events/SingleEvent";
import TrainerRoute from "./SecureRoutes/TrainerRoute";
import ControllerRoute from "./SecureRoutes/ControllerRoute";
import ConsultantRoute from "./SecureRoutes/ConsultantRoute";
import ConsultantManagerRoute from "./SecureRoutes/ConsultantManagerRoute";
import SGLRoute from "./SecureRoutes/SGLRoute";
import SGLManagerRoute from "./SecureRoutes/SGLManagerRoute";
import TeacherRoute from "./SecureRoutes/TeacherRoute";
import TeacherManagerRoute from "./SecureRoutes/TeacherManagerRoute";
import GlRoutes from "./SecureRoutes/GlRoutes";




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
        path: "/courses/:_id",
        element: <CoursesDetails />,
        loader: ({ params }) => fetch(`https://talentgrowacademy-backend.vercel.app/courses/${params._id}`)
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
        path: "/events",
        element: <AllEvents />
      },
      {
        path: "/event/:eventId",
        element: <SingleEvent />
      },
      {
        path: "/books",
        element: <AllBooks />
      },
      {
        path: "/books/:id",
        element: <PrivateRoute><SingleBook /></PrivateRoute>,
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
        path: "courses/:id",
        element: <CourseDetailed />,
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
      {
        path: "user",
        element: <DashboardHolder />,
        children: [
          {
            path: "",
            element: <DashboardHolder />
          },

        ]
      },
      //admin rooutes
      {
        path: "admin",
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
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
            path: "manage",
            element: <ManageAdminstration />
          },
          {
            path: "transactions",
            element: <ManageTransactions />
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
            path: "events",
            element: <ManageEvents />
          },
          {
            path: "courses",
            element: <AdminAllCourseManagementt />
          },
          {
            path: "utilities",
            element: <AdminUtilities />
          },
          {
            path: "count",
            element: <AdminCount />
          },
        ]
      },
      {
        path: "controller",
        element: <ControllerRoute><ControllerDashboard /></ControllerRoute>,
        children: [
          {
            path: "",
            element: <ControllerUserManage />
          },
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
            path: "request",
            element: <ControllerRequest />
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
        path: "consultant",
        element: <ConsultantRoute><ControllerDashboard /></ConsultantRoute>,
        children: [
          {
            path: "",
            element: <ConsultantUserManagement />
          },
          {
            path: "users",
            element: <ConsultantUserManagement />
          },
          {
            path: "requests",
            element: <RequestConsultant />
          },
          {
            path: "count",
            element: <Count />
          },
          {
            path: "search",
            element: <ProfileSearch />
          }
        ]
      },
      {
        path: "consultant-manager",
        element: <ConsultantManagerRoute><ConsultantManagerDashboard /></ConsultantManagerRoute>,
        children: [
          {
            path: "",
            element: <ConsultantManagerConsultantManagement />
          },
          {
            path: "consultant",
            element: <ConsultantManagerConsultantManagement />
          },
          {
            path: "count",
            element: <ConsultantManagerCount />
          },
        ]
      },
      {
        path: "group-leader",
        element: <GlRoutes>< GroupLeaderDashboard /></GlRoutes>,
        children: [
          {
            path: "",
            element: <GroupLeaderUserManagement />
          },
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
            element: <Count />
          },
          {
            path: "count-result",
            element: <CountResult />
          }
        ]
      },
      //Sgl routes
      {
        path: "sgl",
        element: <SGLRoute><SeniorGroupLeaderDashboard /></SGLRoute>,
        children: [
          {
            path: "",
            element: <SGLUserManagement />
          },
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
            element: <Count />
          },
          {
            path: "count-result",
            element: <CountResult />
          },
          {
            path: "search",
            element: <ProfileSearch />
          }
        ]
      },
      //Sgl routes
      {
        path: "sgl-manager",
        element: <SGLManagerRoute><SGLManagerDashboard /></SGLManagerRoute>,
        children: [
          {
            path: "",
            element: <SglManagerUserManagement />
          },
          {
            path: "group-leaders",
            element: <SglManagerGlManager />
          },
          {
            path: "sgl",
            element: <SglManagerSglManagement />
          },
          {
            path: "trainer",
            element: <SglManagerTrainerManageMent />
          },
          {
            path: "count",
            element: <SGLManagerCount />
          },
          {
            path: "search",
            element: <ProfileSearch />
          }
        ]
      },
      {
        path: "trainer",
        element: <TrainerRoute><TrainerDashboard /></TrainerRoute>,
        children: [
          {
            path: "",
            element: <TrainerUserManagement />
          },
          {
            path: "users",
            element: <TrainerUserManagement />
          },
          {
            path: "count",
            element: <Count />
          },
        ]
      },
      {
        path: "teacher",
        element: <TeacherRoute><TeacherDashboard /></TeacherRoute>,
        children: [
          {
            path: "",
            element: <TeacherCourses />
          },
          {
            path: "course",
            element: <TeacherCourses />
          },
        ]
      },
      {
        path: "teacher-manager",
        element: <TeacherManagerRoute><TeacherDashboard /></TeacherManagerRoute>,
        children: [
          {
            path: "",
            element: <TeacherManagerTeacherManage />
          },
          {
            path: "course",
            element: <TeacherManagerCourseManageMent />
          },
          {
            path: "assignments",
            element: <TeacherManagerAssignments />
          },
          {
            path: "links",
            element: <TeacherManagerUtility />
          },
        ]
      },
      // Group Leader
    ]
  }


]);
