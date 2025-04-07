import { useState, useEffect } from 'react';
import useUser from '../../../Others/Register/useUser';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ControllerConsultantManagement = () => {
    const { userdb } = useUser();
    const [consultant, setConsultant] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userdb || !userdb._id) return;

        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/admins/alladmins?role=consultant&page=${currentPage}&limit=${limit}`);
                if (response.status === 200) {
                    setConsultant(response.data.data.results || []);
                    const total = response.data.data.totalCount || 0;
                    setTotalPages(Math.ceil(total / limit));
                } else {
                    throw new Error('Failed to fetch consultants');
                }
            } catch (error) {
                console.error('Error fetching consultants:', error);
            }
        };

        fetchData();
    }, [userdb, currentPage, limit]);

    const handlePermission = async (userId, newPermission) => {
        try {
            const response = await axiosPublic.patch(`/consultants/${userId}`, {
                permission: newPermission,
            });

            if (response.status === 200) {
                toast.success('Permission updated successfully!');
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
                <input type="text" name="searchTerm" placeholder="Search users" className="border border-gray-300 rounded p-2 w-full" />
                <select name="status" className="border border-gray-300 rounded p-2 w-full">
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>
                <select name="role" className="border border-gray-300 rounded p-2 w-full">
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                </select>
                <div className="flex space-x-2">
                    <input type="date" name="fromDate" className="border border-gray-300 rounded p-2 w-full" />
                    <input type="date" name="toDate" className="border border-gray-300 rounded p-2 w-full" />
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
                            <tr key={user._id} className="hover:bg-gray-50 cursor-pointer">
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
                                            onChange={(e) => handlePermission(user._id, e.target.checked)}
                                        />
                                        <span className="ml-2">{user.permission ? 'Yes' : 'No'}</span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2 flex-wrap">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ControllerConsultantManagement;
