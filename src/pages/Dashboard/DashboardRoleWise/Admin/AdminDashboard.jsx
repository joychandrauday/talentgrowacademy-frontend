
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {
    return (
        <div className='p-6'>
            <Outlet />
        </div>
    );
}



// prop validation


export default AdminDashboard;
