import React from 'react';
import TrainerUserManagement from './TrainerUserManagement';
import { Outlet } from 'react-router-dom';

const TrainerDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default TrainerDashboard;
