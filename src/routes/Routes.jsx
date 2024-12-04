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
       path:"/departments",
       element:<Departments/>
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
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardHolder />,
      },
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
    ]
  }


]);
