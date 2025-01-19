import React from 'react';
import Profile from '../pages/Dashboard/DashboardCommon/Profile';
import useUser from '../pages/Others/Register/useUser';

const InactiveRoute = () => {
    const { userdb } = useUser();
    return (
        <div>
            <div className="blockScreen min-h-screen flex justify-center items-center">
                {
                    userdb.status === 'blocked' ? <><div className="blockScreenInner text-primary text-center">
                        <h1 className="font-bold text-2xl">
                            Your account has been blocked
                        </h1>
                        <p>Contact your admin to unlock your account.</p>
                        <Profile />
                    </div></> : ''
                }
            </div>
        </div>
    );
}

export default InactiveRoute;
