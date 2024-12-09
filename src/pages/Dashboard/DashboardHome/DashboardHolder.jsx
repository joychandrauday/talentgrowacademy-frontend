import React from 'react';
import PropTypes from 'prop-types';
import UserDashboard from './UserDashboard';
import { ScrollRestoration } from 'react-router-dom';
import ConsultantDashboard from '../DashboardRoleWise/Consultant/ConsultantDashboard';
import useUser from '../../Others/Register/useUser';
import AdminDashboard from '../DashboardRoleWise/Admin/AdminDashboard';
import ControllerDashboard from '../DashboardRoleWise/Controller/ControllerDashboard';

const DashboardHolder = () => {
    const { userdb } = useUser()
    // const user = {
    //     name: "Joy Chandra Uday",
    //     email: "joy@example.com",
    //     image: "https://via.placeholder.com/150", // Replace with actual profile image URL if needed
    //     balance: 120.75,
    //     role: "consultant",
    //     activeCourses: 4,
    //     transactions: 12,
    //     pendingTasks: 3
    // };
    const role = userdb.role; // You can change this to 'controller', 'consultant', 'groupleader', or 'user'


    return (
        <div>
            {/* Content for admin */}
            {role === 'admin' && <AdminDashboard />}

            {/* Content for controller */}
            {role === 'controller' && <ControllerDashboard />}

            {/* Content for consultant */}
            {role === 'consultant' && <ConsultantDashboard />}

            {/* Content for group leader */}
            {role === 'groupleader' && <p>You are a group leader. Oversee your team and tasks.</p>}

            {/* Content for general users */}
            {role === 'user' && <UserDashboard user={userdb} />}
            <ScrollRestoration />
        </div>
    );
};

DashboardHolder.propTypes = {
    role: PropTypes.string,
};

export default DashboardHolder;
