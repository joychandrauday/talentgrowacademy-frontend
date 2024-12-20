import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import useFetchAdmin from '../../../Hooks/useFetchAdmin';

const ManageAdminstration = () => {
    const initialQueryParams = {
        searchTerm: '',
        role: '',
        status: '',
        sort: '-createdAt',
        limit: 10,
        page: 1,
        fromDate: '',
        toDate: '',
    };

    const {
        data,
        isLoading,
        isError,
        error,
        queryParams,
        updateQueryParams,
    } = useFetchAdmin(initialQueryParams);

    const [filters, setFilters] = useState({
        searchTerm: '',
        status: '',
        role: '',
        fromDate: '',
        toDate: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (data && data.data) {
            setTotalPages(Math.ceil(data.data.totalCount / initialQueryParams.limit));
        }
    }, [data]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        updateQueryParams({
            searchTerm: filters.searchTerm.trim(),
            status: filters.status,
            role: filters.role,
            fromDate: filters.fromDate,
            toDate: filters.toDate,
            page: currentPage,  // Ensure the page is updated
        });
    };

    const handlePagination = (page) => {
        if (page < 1 || page > totalPages) return;  // Prevent invalid page numbers
        setCurrentPage(page);
        applyFilters();  // Reapply filters with updated page
    };

    // Handle search
    const handleSearch = () => {
        setCurrentPage(1);  // Reset to first page on new search
        applyFilters();
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
                        value={filters.searchTerm}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
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
                        value={filters.role}
                        onChange={handleFilterChange}
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
                        value={filters.fromDate}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="date"
                        name="toDate"
                        value={filters.toDate}
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
            ) : isError ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">userID</th>
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
                            {data?.data?.results.map((user) => (
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div className="space-x-2">
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
        </div>
    );
};

ManageAdminstration.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.object,
};

export default ManageAdminstration;
