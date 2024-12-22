import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchUsers from '../../Hooks/useFetchUsers';
import useUser from '../../pages/Others/Register/useUser';

const Count = () => {
    const { userdb } = useUser();
    console.log(userdb?._id);

    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        role: 'user',
        status: '', // Filter by active or inactive
        sort: '-createdAt',
        limit: 200,
        page: 1,
        fromDate: '',
        toDate: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // State for active tab: 'all', 'active', 'inactive'
    const [filteredData, setFilteredData] = useState([]);
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
    const [totalUsersCount, setTotalUsersCount] = useState(0);

    useEffect(() => {
        if (userdb) {
            const dynamicField = userdb.role;
            if (dynamicField) {
                setQueryParams((prevParams) => ({
                    ...prevParams,
                    [dynamicField]: userdb._id,
                }));
            }
        }
    }, [userdb]);

    // Fetching users based on queryParams
    const { users, totalPages, currentPage, isLoading, isError, error, refetch } = useFetchUsers(queryParams);

    // Handle search query
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle sorting by different fields
    const handleSort = (field) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            sort: prevParams.sort === field ? `-${field}` : field,
        }));
    };

    // Handle page change
    const handlePageChange = (page) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            page,
        }));
    };

    // Handle sorting by date
    const handleDateSort = () => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            sort: prevParams.sort === 'createdAt' ? '-createdAt' : 'createdAt',
        }));
    };

    // Handle status filter
    const handleFilterChange = (e) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle date range filter
    const handleDateRangeChange = (e) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            [e.target.name]: e.target.value,
        }));
    };

    // Update filtered users data whenever the tab is changed or new data is fetched
    useEffect(() => {
        let filtered = users;

        // Apply search query
        if (searchQuery) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply tab filter (active, inactive, all)
        if (activeTab === 'active') {
            filtered = filtered.filter((user) => user.status === 'active');
        } else if (activeTab === 'inactive') {
            filtered = filtered.filter((user) => user.status === 'inactive');
        }

        // Apply date range filter
        if (queryParams.fromDate) {
            filtered = filtered.filter(
                (user) => new Date(user.createdAt) >= new Date(queryParams.fromDate)
            );
        }
        if (queryParams.toDate) {
            filtered = filtered.filter(
                (user) => new Date(user.createdAt) <= new Date(queryParams.toDate)
            );
        }

        setFilteredData(filtered);

        // Update the user counts
        setActiveUsersCount(users.filter((user) => user.status === 'active').length);
        setInactiveUsersCount(users.filter((user) => user.status === 'inactive').length);
        setTotalUsersCount(users.length);
    }, [activeTab, users, searchQuery, queryParams]);

    return (
        <div className='p-6'>
            {/* Tab Navigation */}
            <div className="mb-4 flex justify-between gap-4">
                <div
                    className={`w-full  px-4 py-12 text-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${activeTab === 'all' ? 'bg-blue-500 text-white shadow-xl' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
                    onClick={() => setActiveTab('all')}
                >
                    <h3 className="text-xl font-semibold">All Users</h3>
                    <p className="text-2xl">{totalUsersCount}</p>
                </div>
                <div
                    className={`w-full  px-4 py-12 text-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${activeTab === 'active' ? 'bg-green-500 text-white shadow-xl' : 'bg-gray-200 text-gray-800 hover:bg-green-100'}`}
                    onClick={() => setActiveTab('active')}
                >
                    <h3 className="text-xl font-semibold">Active Users</h3>
                    <p className="text-2xl">{activeUsersCount}</p>
                </div>
                <div
                    className={`w-full  px-4 py-12 text-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${activeTab === 'inactive' ? 'bg-red-500 text-white shadow-xl' : 'bg-gray-200 text-gray-800 hover:bg-red-100'}`}
                    onClick={() => setActiveTab('inactive')}
                >
                    <h3 className="text-xl font-semibold">Inactive Users</h3>
                    <p className="text-2xl">{inactiveUsersCount}</p>
                </div>
            </div>


            {/* Search Input */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search users"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div>
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
                </div>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        name="fromDate"
                        value={queryParams.fromDate}
                        onChange={handleDateRangeChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="date"
                        name="toDate"
                        value={queryParams.toDate}
                        onChange={handleDateRangeChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Active Date</th>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Whatsapp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    {user.status === 'active' ? new Date(user.updatedAt).toLocaleDateString() : <span>{user.status}</span>}
                                </td>
                                <td className="border px-4 py-2">{user.userID}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2">{user.whatsapp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

Count.propTypes = {};

export default Count;
