import React from 'react';
import PropTypes from 'prop-types';
import UserDashboard from './UserDashboard';

const DashboardHolder = () => {
    const user = {
        name: "Joy Chandra Uday",
        email: "joy@example.com",
        image: "https://via.placeholder.com/150", // Replace with actual profile image URL if needed
        balance: 120.75,
        role: "user",
        activeCourses: 4,
        transactions: 12,
        pendingTasks: 3
    };
    const role = 'user'; // You can change this to 'controller', 'consultant', 'groupleader', or 'user'


    return (
        <div>
            {/* Content for admin */}
            {role === 'admin' && <p>You are an admin. You have full control over the system.</p>}

            {/* Content for controller */}
            {role === 'controller' && <p>You are a controller. Manage and monitor system activities.</p>}

            {/* Content for consultant */}
            {role === 'consultant' && <p>You are a consultant. Provide expert advice and recommendations.</p>}

            {/* Content for group leader */}
            {role === 'groupleader' && <p>You are a group leader. Oversee your team and tasks.</p>}

            {/* Content for general users */}
            {role === 'user' && <UserDashboard user={user} />}
        </div>
    );
};

DashboardHolder.propTypes = {
    role: PropTypes.string,
};

export default DashboardHolder;
