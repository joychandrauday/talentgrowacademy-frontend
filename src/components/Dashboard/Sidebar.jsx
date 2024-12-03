import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link functionality
import { FaTachometerAlt, FaUserAlt, FaRegFileAlt, FaRegMoneyBillAlt, FaHistory, FaChalkboardTeacher, FaLock, FaSignOutAlt } from 'react-icons/fa'; // Import relevant icons
import logo from '../../assets/logo.png';

const Sidebar = ({ user }) => {
    return (
        <div className="bg-white border shadow rounded-xl text-primary w-full md:w-64 md:min-h-screen p-5">
            {/* Logo */}
            <div className="logo mb-6">
                <img src={logo} alt="Logo" />
            </div>

            {/* User Info Section */}
            <div className="flex items-center mb-6">
                <img
                    src={user?.image || 'https://via.placeholder.com/150'}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                    <div className="text-xl font-semibold">{user?.name || 'John Doe'}</div>
                    <div className="text-sm">{user?.email || 'user@example.com'}</div>
                    <div className="text-sm mt-2">Balance: {user?.balance || '0.00'} USD</div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4">
                <NavLink
                    to="/dashboard"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white" // Adds the active background class
                >
                    <FaTachometerAlt className="mr-2" />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/dashboard/profile"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaUserAlt className="mr-2" />
                    Profile
                </NavLink>
                <NavLink
                    to="/dashboard/passbook"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaRegFileAlt className="mr-2" />
                    Passbook
                </NavLink>
                <NavLink
                    to="/dashboard/withdrawal"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaRegMoneyBillAlt className="mr-2" />
                    Withdrawal
                </NavLink>
                <NavLink
                    to="/dashboard/reference-history"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaHistory className="mr-2" />
                    Reference History
                </NavLink>
                <NavLink
                    to="/dashboard/courses"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaChalkboardTeacher className="mr-2" />
                    Courses
                </NavLink>
                <NavLink
                    to="/dashboard/change-password"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaLock className="mr-2" />
                    Change Password
                </NavLink>
                <NavLink
                    to="/signout"
                    className="flex items-center p-2 rounded-md hover:bg-secondary"
                    activeClassName="bg-secondary text-white"
                >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                </NavLink>
            </nav>
        </div>
    );
};

// Props validation
Sidebar.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string,
        balance: PropTypes.number
    }).isRequired
};

export default Sidebar;
