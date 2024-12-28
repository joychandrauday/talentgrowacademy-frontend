import React from 'react';
import PropTypes from 'prop-types';
import UserDashboard from './UserDashboard';
import { ScrollRestoration } from 'react-router-dom';
import ConsultantDashboard from '../DashboardRoleWise/Consultant/ConsultantDashboard';
import useUser from '../../Others/Register/useUser';
import AdminDashboard from '../DashboardRoleWise/Admin/AdminDashboard';
import ControllerDashboard from '../DashboardRoleWise/Controller/ControllerDashboard';
import TrainerDashboard from '../DashboardRoleWise/Trainer/TrainerDashboard';
import GroupLeaderDashboard from '../DashboardRoleWise/GroupLeader/GroupLeaderDashboard';
import SeniorGroupLeaderDashboard from '../DashboardRoleWise/SeniorGroupLeader/SeniorGroupLeaderDashboard';
import TeacherDashboard from '../DashboardRoleWise/Teacher/TeacherDashboard';

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
            {role === 'controller' && <ControllerDashboard />}
            {role === 'consultant' && <ConsultantDashboard />}
            {role === 'sgl' && <SeniorGroupLeaderDashboard />}
            {role === 'sgl-manager' && <SeniorGroupLeaderDashboard />}
            {role === 'group-leader' && <GroupLeaderDashboard />}
            {role === 'trainer' && <TrainerDashboard />}
            {role === 'teacher' && <TeacherDashboard />}
            {role === 'user' && <UserDashboard user={userdb} />}
            <ScrollRestoration />
        </div>
    );
};

DashboardHolder.propTypes = {
    role: PropTypes.string,
};

export default DashboardHolder;
