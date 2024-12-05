import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';

const Dashboard = () => {
    // Example user data, this could come from props, context, or API
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'consultant',
        image: 'https://via.placeholder.com/150', // Replace with the actual user image
        balance: '120.50',
    };

    return (
        <div className="min-h-screen container mx-auto pt-10 flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
