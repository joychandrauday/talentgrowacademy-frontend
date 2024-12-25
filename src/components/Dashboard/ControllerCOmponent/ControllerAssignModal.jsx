import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchUsers from '../../../Hooks/useFetchUsers';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ControllerAssignModal = ({ user, onClose }) => {
    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        role: 'user',
        status: 'inactive',
        sort: '-createdAt',
        limit: 10,
        page: 1,
        fromDate: '',
        toDate: '',
        consultant: 'null'
    });

    const axiosPublic = useAxiosPublic();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [isTodaySelected, setIsTodaySelected] = useState(false);
    const [isLastMonthSelected, setIsLastMonthSelected] = useState(false);

    // Fetching users based on queryParams
    const { users, totalPages, currentPage, totalInactive, isLoading, isError, error, refetch } = useFetchUsers(queryParams);

    // Handle search query
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setQueryParams((prevParams) => ({
            ...prevParams,
            searchTerm, // Update the search term in queryParams
            page: 1, // Reset to the first page on search
        }));
    };

    // Handle page change
    const handlePageChange = (page) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            page,
        }));
    };

    // Handle the "Show Today's Data" checkbox
    const handleTodayCheckboxChange = (e) => {
        setIsTodaySelected(e.target.checked);
    };

    // Handle the "Show Last Month's Data" checkbox
    const handleLastMonthCheckboxChange = (e) => {
        setIsLastMonthSelected(e.target.checked);
    };

    // Handle the date range change
    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setQueryParams((prevParams) => ({
            ...prevParams,
            [name]: value, // Dynamically update the 'fromDate' or 'toDate' in queryParams
        }));
    };

    // Update filtered users data whenever the tab is changed or new data is fetched
    useEffect(() => {
        let filtered = users;

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

        // Apply today's data filter if checkbox is checked
        if (isTodaySelected) {
            const today = new Date().toLocaleDateString();
            filtered = filtered.filter((user) => {
                const createdDate = new Date(user.createdAt).toLocaleDateString();
                const activateDate = new Date(user.activateDate).toLocaleDateString();
                return createdDate === today || activateDate === today;
            });
        }

        // Apply last 30 days' data filter if checkbox is checked
        if (isLastMonthSelected) {
            const now = new Date();
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30); // Set the date to 30 days ago

            filtered = filtered.filter((user) => {
                const createdDate = new Date(user.createdAt);
                const activateDate = new Date(user.activateDate);
                return (
                    (createdDate >= thirtyDaysAgo && createdDate <= now) ||
                    (activateDate >= thirtyDaysAgo && activateDate <= now)
                );
            });
        }
        setFilteredData(filtered);
    }, [activeTab, users, queryParams, isTodaySelected, isLastMonthSelected]);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleAssign = async () => {
        if (selectedUsers.length === 0) {
            Swal.fire('Error', 'Please select at least one user!', 'error');
            return;
        }

        try {
            const payload = {
                identifiers: selectedUsers,
                data: { consultant: user._id },
            };
            const response = await axiosPublic.post('/users/assignconsultant', payload);
            if (response.status === 200) {
                Swal.fire(
                    'Success',
                    `${selectedUsers.length} user(s) have been assigned successfully to ${user.name}!`,
                    'success'
                );
                onClose();
            } else {
                throw new Error('Failed to assign users. Please try again.');
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to assign users. Please try again.', 'error');
        }
    };

    return (
        <div className="absolute md:fixed inset-0 z-50 flex items-center min-h-screen justify-center bg-black bg-opacity-50 overflow-scroll ">
            <div className="bg-white mt- md:mt-0 rounded-lg shadow-lg p-6 w-full mt-80">
                <h2 className="text-xl font-bold mb-4">Assign Users to Consultant</h2>
                <p className="text-gray-700 mb-4">
                    Select users to assign them to <span className="font-semibold">{user.name}</span>.
                </p>
                <div className="filterandparams">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
                        <div>
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="Search users"
                                value={queryParams.searchTerm}
                                onChange={handleSearch}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="flex gap-2">
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
                        <div className="flex gap-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={isTodaySelected}
                                    onChange={handleTodayCheckboxChange}
                                    className="form-checkbox h-8 w-8 text-blue-500 transition duration-200 ease-in-out"
                                />
                                <span className="text-sm text-gray-700 font-semibold">Show Today's Data</span>
                            </label>

                            {/* Last Month's Data Checkbox */}
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={isLastMonthSelected}
                                    onChange={handleLastMonthCheckboxChange}
                                    className="form-checkbox h-8 w-8 text-blue-500 transition duration-200 ease-in-out"
                                />
                                <span className="text-sm text-gray-700 font-semibold">Show Last Month's Data</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                {filteredData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-300 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Select</th>
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">userID</th>
                                    <th className="border px-4 py-2">Phone</th>
                                    <th className="border px-4 py-2">Whatsapp</th>
                                    <th className="border px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={() => handleCheckboxChange(user._id)}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.userID}</td>
                                        <td className="border px-4 py-2">{user.phone}</td>
                                        <td className="border px-4 py-2">{user.whatsapp}</td>
                                        <td className="border px-4 py-2">{user.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No users found.</p>
                )}

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Previous
                    </button>
                    <div>
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Next
                    </button>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleAssign}
                        className="bg-blue-500 text-white py-2 px-6 rounded-md"
                    >
                        Assign
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white py-2 px-6 rounded-md ml-4"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div >
    );
};

ControllerAssignModal.propTypes = {
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ControllerAssignModal;
