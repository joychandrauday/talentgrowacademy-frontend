import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
} from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Sidebar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

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
                className={`fixed rounded-lg top-0 left-0 z-40 bg-white border shadow-md text-primary w-64 p-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:relative  md:block transition-transform duration-300`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-lg absolute top-4 right-4"
                >
                    ✖
                </button>

                {/* Logo */}
                <div className="logo mb-6 hidden md:block">
                    <img src={logo} alt="Logo" />
                </div>

                {/* User Info Section */}
                <div className="flex justify-start items-center mb-6">
                    <img
                        src={user?.image || 'https://via.placeholder.com/150'}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <div className="text-xl font-semibold">{user?.name || 'John Doe'}</div>
                        <div className="text-sm mt-2">Balance: {user?.balance || '0.00'} USD</div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2 font-semibold">
                    {[
                        { to: '/dashboard/', label: 'Dashboard', icon: <FaTachometerAlt /> },
                        { to: '/dashboard/profile', label: 'Profile', icon: <FaUserAlt /> },
                        { to: '/dashboard/passbook', label: 'Passbook', icon: <FaRegFileAlt /> },
                        { to: '/dashboard/withdrawal', label: 'Withdrawal', icon: <FaRegMoneyBillAlt /> },
                        { to: '/dashboard/reference-history', label: 'Reference History', icon: <FaHistory /> },
                        { to: '/dashboard/courses', label: 'Courses', icon: <FaChalkboardTeacher /> },
                        { to: '/dashboard/change-password', label: 'Change Password', icon: <FaLock /> },
                        { to: '/signout', label: 'Sign Out', icon: <FaSignOutAlt /> },
                    ].map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/dashboard/'}
                            className={({ isActive }) =>
                                `flex gap-4 border shadow-md items-center p-2 rounded-md hover:bg-secondary hover:text-white ${isActive ? 'bg-secondary text-white' : ''
                                }`
                            }
                        >
                            {icon} {label}
                        </NavLink>
                    ))}
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

// Props validation
Sidebar.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string,
        balance: PropTypes.number,
    }).isRequired,
};

export default Sidebar;
