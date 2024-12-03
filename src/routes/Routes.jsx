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
        element: <h1>Dashboard Courses</h1>,
      },
      {
        path: "passbook",
        element: <h1>Dashboard passbook</h1>,
      },
      {
        path: "withdrawal",
        element: <h1>Dashboard passbook</h1>,
      },
      {
        path: "reference-history",
        element: <h1>Dashboard passbook</h1>,
      },
      {
        path: "courses",
        element: <h1>Dashboard Courses</h1>,
      },
      {
        path: "chyange-password",
        element: <h1>Dashboard passbook</h1>,
      },
    ]
  }


]);
