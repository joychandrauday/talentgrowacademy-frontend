import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../../Others/Register/useUser';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ControllerConsultantManagement = () => {
    const { userdb } = useUser();
    const [consultant, setConsultant] = useState([]); // List of consultants
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch consultants on component mount
    useEffect(() => {
        if (!userdb || !userdb._id) {
            console.log('Waiting for user data...');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/admins/alladmins?role=consultant`);
                if (response.status === 200) {
                    setConsultant(response.data.data.results); // Assuming your data structure
                    console.log('Fetched data:', response.data.data.results);
                } else {
                    throw new Error('Failed to fetch consultants');
                }
            } catch (error) {
                console.error('Error fetching consultants:', error);
            }
        };

        fetchData();
    }, [userdb]);

    // Handle permission update
    const handlePermission = async (userId, newPermission) => {
        console.log(`Updating permission for User ID: ${userId} to ${newPermission}`);
        try {
            const response = await axiosPublic.patch(`/consultants/${userId}`, {
                permission: newPermission, // No need to pass `userId` in the body
            });

            if (response.status === 200) {
                toast.success('Permission updated successfully!');
                // Update permission locally
                setConsultant((prevConsultant) =>
                    prevConsultant.map((user) =>
                        user.userID === userId ? { ...user, permission: newPermission } : user
                    )
                );
            } else {
                throw new Error('Failed to update permission');
            }
        } catch (error) {
            toast.error('Error updating permission');
            console.error('Error updating permission:', error);
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Manage Administration</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search users"
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div>
                    <select
                        name="status"
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Filter by Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <select
                        name="role"
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        name="fromDate"
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="date"
                        name="toDate"
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
            </div>
            <button className="bg-secondary text-white px-8 font-semibold py-2 rounded-full hover:bg-primary mb-4">
                Search
            </button>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Whatsapp</th>
                            <th className="border px-4 py-2">Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultant.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 cursor-pointer" >
                                <td className="border px-4 py-2" onClick={() => navigate(`/dashboard/controller/consultant/${user.userID}`)}>{user.name}</td>
                                <td className="border px-4 py-2" onClick={() => navigate(`/dashboard/controller/consultant/${user.userID}`)}>{user.userID}</td>
                                <td className="border px-4 py-2" onClick={() => navigate(`/dashboard/controller/consultant/${user.userID}`)}>{user.phone}</td>
                                <td className="border px-4 py-2" onClick={() => navigate(`/dashboard/controller/consultant/${user.userID}`)}>{user.whatsapp}</td>
                                <td className="border px-4 py-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={user.permission}
                                            onChange={(e) => handlePermission(user.userID, e.target.checked)}
                                        />
                                        <span className="ml-2">{user.permission ? 'Yes' : 'No'}</span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ControllerConsultantManagement.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.object,
};

export default ControllerConsultantManagement;
