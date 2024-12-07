import React, { useContext, useState } from "react";
import logo from '../../../assets/logo.webp';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const NavLinks = {
    '/': 'Home',
    '/about': 'About',
    '/courses': 'Courses',
    '/contact': 'Contact',
  };
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">
      {/* Logo */}
      <div className="flex items-center h-16">
        <Link to={'/'}>
          <img src={logo} alt="Logo" className="w-36 md:w-48" />
        </Link>
      </div>

      {/* Hamburger menu for mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-secondary focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-4 md:flex-row w-full md:w-auto`}
      >
        <ul className="menu menu-vertical md:menu-horizontal gap-4 px-2 md:px-0">
          {Object.entries(NavLinks).map(([path, label]) => (
            <li key={path}>
              <Link
                to={path}
                className={`${location.pathname === path
                  ? "text-primary font-semibold"
                  : "text-secondary font-semibold"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Log In & Sign Up Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 ">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={user.photoURL || "User"} src={user.photoURL || ""} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to={'/login'}
                className="btn rounded-full w-full md:w-32 border-2 border-secondary hover:bg-secondary hover:border-none hover:text-white bg-transparent"
              >
                Log In
              </Link>
              <Link
                to={'/register'}
                className="btn border-none rounded-full w-full md:w-32 bg-secondary hover:bg-primary text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
