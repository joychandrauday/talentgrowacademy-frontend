import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const NavLinks = {
    "/": "Home",
    "/about": "About",
    "/courses": "Courses",
    "/contact": "Contact",
  };

  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle navigation and close sidebar
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">
      {/* Logo */}
      <div className="flex items-center h-16">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36 md:w-48" />
        </Link>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-secondary focus:outline-none"
          aria-label="Toggle navigation menu"
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

      {/* Navigation Links (Mobile Sidebar) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:static md:transform-none md:bg-transparent md:shadow-none md:h-auto md:w-auto md:flex md:items-center md:gap-4`}
      >
        <ul className="menu menu-vertical gap-4 p-4 md:menu-horizontal md:px-0">
          {Object.entries(NavLinks).map(([path, label]) => (
            <li key={path}>
              <Link
                to={path}
                onClick={handleLinkClick}
                className={`${
                  location.pathname === path
                    ? "text-primary font-semibold"
                    : "text-secondary font-semibold"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.photoURL || "User"}
                    src={user.photoURL || "https://via.placeholder.com/40"}
                  />
                </div>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 w-52 bg-base-100 rounded-box z-[100] p-2 shadow-lg">
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logOut();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn rounded-full w-full md:w-32 border-2 border-secondary hover:bg-secondary hover:border-none hover:text-white bg-transparent"
                onClick={handleLinkClick}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn border-none rounded-full w-full md:w-32 bg-secondary hover:bg-primary text-white"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
