import React, { useContext } from "react";
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
  const { user, logOut } = useContext(AuthContext)
  console.log(user);
  return (
    <div className="navbar container mx-auto 
    ">
      <div className="flex-1 h-24 overflow-hidden ">
        <Link to={'/'} className="w-48 "><img src={logo} alt="" /></Link>
      </div>
      <div className="flex-none gap-2">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {Object.entries(NavLinks).map(([path, label]) => (
              <li key={path}>
                <Link to={path} className={`${location.pathname === path ? "text-primary font-semibold " : "text-secondary font-semibold"
                  }`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* log in & sign up button */}

        {
          user ?
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><a onClick={logOut}>Logout</a></li>
                </ul>
              </div>
            </> :
            <>
              <Link to={'/login'} className="btn rounded-full w-32 border-2 border-secondary hover:bg-secondary hover:border-none hover:text-white bg-transparent ">Log In</Link>
              <Link to={'/register'} className="btn border-none rounded-full w-32 text-white  bg-secondary hover:bg-primary">Register</Link>
            </>
        }
      </div>
    </div >
  );
};

export default Navbar;
