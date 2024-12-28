import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ManageAdministration = () => {
    const axiosPublic = useAxiosPublic();
    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        status: '',
        role: '',
        fromDate: '',
        toDate: '',
        page: 1,
        limit: 5, // pagination limit
    });

    // Fetch admin users from API
    const fetchAdmins = async () => {
        try {
            setIsLoading(true);
            const response = await axiosPublic.get('/admins/alladmins', {
                params: queryParams, // Send queryParams directly to the API
            });
            setAdmins(response.data.data.results);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error('Error fetching administrative users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch admins whenever queryParams.page changes
    useEffect(() => {
        fetchAdmins();
    }, [queryParams.page]); // Trigger refetch when page changes

    // Handle filter change (for inputs like search or other filters)
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setQueryParams((prev) => ({
            ...prev,
            [name]: value,
            page: 1, // Reset to the first page when filters change
        }));
    };

    // Handle page change (pagination)
    const handlePagination = (page) => {
        if (page < 1 || page > totalPages) return;
        setQueryParams((prev) => ({ ...prev, page }));
        setCurrentPage(page); // Update currentPage state to reflect the change
    };

    // Apply filters and reset to the first page
    const handleSearch = () => {
        setQueryParams((prev) => ({
            ...prev,
            page: 1, // Reset to the first page when searching
        }));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Manage Administration</h1>

            <div>Filters</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search users"
                    value={queryParams.searchTerm}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
                <select
                    name="status"
                    value={queryParams.status}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>
                <select
                    name="role"
                    value={queryParams.role}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                </select>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        name="fromDate"
                        value={queryParams.fromDate}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="date"
                        name="toDate"
                        value={queryParams.toDate}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="bg-secondary text-white px-8 font-semibold py-2 rounded-full hover:bg-primary mb-4"
            >
                Search
            </button>

            {/* Table */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">User ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Trainer</th>
                                <th className="border px-4 py-2">Role</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{user.userID}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className="border px-4 py-2">{user.trainer?.name}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2">{user.status}</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-secondary px-3 py-1 rounded flex items-center text-2xl">
                                            <IoCheckmarkCircleSharp />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

ManageAdministration.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.object,
};

export default ManageAdministration;
