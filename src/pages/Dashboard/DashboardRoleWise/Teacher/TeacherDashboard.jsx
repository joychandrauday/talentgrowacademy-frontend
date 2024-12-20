import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';


const TeacherDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};


TeacherDashboard.propTypes = {

};


export default TeacherDashboard;
