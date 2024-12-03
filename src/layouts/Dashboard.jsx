import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';

const Dashboard = () => {
    // Example user data, this could come from props, context, or API
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'https://via.placeholder.com/150', // Replace with the actual user image
        balance: '120.50',
    };

    return (
        <div className="min-h-screen container mx-auto  flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
                <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
                <Outlet />
                {/* Dashboard Content */}
                {/* Add any cards or sections you want to display here */}
            </div>
        </div>
    );
};

export default Dashboard;
