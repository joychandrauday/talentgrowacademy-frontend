import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';


const SGLManagerDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};


SGLManagerDashboard.propTypes = {

};


export default SGLManagerDashboard;
