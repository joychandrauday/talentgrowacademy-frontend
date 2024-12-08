
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import useUser from '../pages/Others/Register/useUser';

const Dashboard = () => {
    const { userdb } = useUser()
    console.log(userdb);
    // Render the dashboard page with sidebar and main content components
    // The Outlet component will render the component corresponding to the current route path
    return (
        <div className="min-h-screen container mx-auto pt-10 flex flex-col md:flex-row" >
            {/* Sidebar */}
            < div >
                <Sidebar user={userdb} />
            </div >

            {/* Main Content */}
            < div className="flex-1" >
                <Outlet />
            </div >
        </div >
    );
};

export default Dashboard;
