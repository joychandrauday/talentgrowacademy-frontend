import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';


const SeniorGroupLeaderDashboard = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};


SeniorGroupLeaderDashboard.propTypes = {

};


export default SeniorGroupLeaderDashboard;
