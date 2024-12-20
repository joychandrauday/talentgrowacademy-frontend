import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetchUsers from '../../../../Hooks/useFetchUsers';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';

const ControllerCount = () => {
    // State for managing the query parameters for fetching users
    const [queryParams, setQueryParams] = useState({
        sort: '-createdAt',  // Default sort by creation date (descending)
        role: 'user',
    });

    // Custom hook to fetch users based on the query parameters
    const { users, isLoading, isError, error, refetch } = useFetchUsers(queryParams);

    // // Handle sorting change (if needed in the future)
    // const handleSortChange = (newSort) => {
    //     setQueryParams({ ...queryParams, sort: newSort });
    //     refetch();
    // };
    // Overview data for users based on status
    const countUsersByStatus = (status) => {
        return users.filter((user) => user.status === status).length;
    };
    const countUsersByAssign = () => {
        return users.filter((user) => user.trainer).length;
    };
    const overviewData = [
        { label: 'Active Users', count: countUsersByStatus('active') },
        { label: 'Assigned Users', count: countUsersByAssign() },
        { label: 'Pending Users', count: countUsersByStatus('pending') },
        { label: 'Inactive Users', count: countUsersByStatus('inactive') },
    ];

    // Tab Management
    const [activeTab, setActiveTab] = useState(overviewData[0].label); // Set the first tab as active
    // Counting the users by their status
    const activeUsers = users.filter((user) => user.status === 'active');
    const assignedUsers = users.filter((user) => user.trainer)
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }



    return (
        <div className='p-6'>
            {/* Tabs */}
            <div className="mb-4 ">
                <div className="flex space-x-4 ">
                    {overviewData.map((data) => (
                        <button
                            key={data.label}
                            className={`p-4 w-full rounded-lg font-semibold ${activeTab === data.label ? 'bg-secondary text-white' : 'bg-gray-200'
                                }`}
                            onClick={() => setActiveTab(data.label)}
                        >
                            <h4 className="text-xl font-semibold">{data.label}</h4>
                            <p className="text-3xl">{data.count}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* active tab content */}
            {
                activeTab === overviewData[0].label && (
                    <div className="flex flex-col space-y-4">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Phone</th>
                                    <th className="border px-4 py-2">trainer</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.phone}</td>
                                        <td className="border px-4 py-2">{user.trainer}</td>
                                        <td className="border px-4 py-2">{user.role}</td>
                                        <td className="border px-4 py-2">{user.status}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                )
            }
            {/* active tab content */}
            {
                activeTab === overviewData[1].label && (
                    <div className="flex flex-col space-y-4">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Phone</th>
                                    <th className="border px-4 py-2">trainer</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.phone}</td>
                                        <td className="border px-4 py-2">{user.trainer}</td>
                                        <td className="border px-4 py-2">{user.role}</td>
                                        <td className="border px-4 py-2">{user.status}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                )
            }

        </div>
    );
};

ControllerCount.propTypes = {
    // Define your PropTypes if needed
};

export default ControllerCount;
