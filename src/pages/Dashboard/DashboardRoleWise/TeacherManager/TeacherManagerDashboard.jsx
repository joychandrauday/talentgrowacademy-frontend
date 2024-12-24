import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';


const TeacherManagerDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};


TeacherManagerDashboard.propTypes = {

};


export default TeacherManagerDashboard;
