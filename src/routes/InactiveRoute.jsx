import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../pages/Dashboard/DashboardCommon/Profile';


class InactiveRoute extends Component {
    render() {
        return (
            <div>
                <div className="blockScreen min-h-screen flex justify-center items-center">
                    <div className="blockScreenInner text-primary text-center">
                        <h1 className="font-bold text-2xl">
                            Your account has been blocked
                        </h1>
                        <p>Contact your admin to unlock your account.</p>
                        <Profile />
                    </div>
                </div>
            </div>
        );
    }
}


InactiveRoute.propTypes = {

};


export default InactiveRoute;
