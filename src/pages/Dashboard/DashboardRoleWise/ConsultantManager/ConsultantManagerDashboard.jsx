import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';


const ConsultantManagerDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};


ConsultantManagerDashboard.propTypes = {

};


export default ConsultantManagerDashboard;
