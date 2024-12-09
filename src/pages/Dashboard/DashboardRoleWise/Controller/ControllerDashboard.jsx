import React from 'react';
import { Outlet } from 'react-router-dom';

const ControllerDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default ControllerDashboard;
