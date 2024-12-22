import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { TbClockCheck } from 'react-icons/tb';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import useUser from '../../../Others/Register/useUser';
import useFetchUsers from '../../../../Hooks/useFetchUsers';
import toast from 'react-hot-toast';

const ConsultantUserManagement = () => {
    const { userdb } = useUser()
    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        role: 'user',
        status: '',
        sort: '-createdAt',
        limit: 10,
        page: 1,  // Start with the first page
        fromDate: '',
        toDate: '',
    });
    useEffect(() => {
        if (userdb) {
            setQueryParams((prevParams) => ({ ...prevParams, consultant: userdb._id }));
        }
    }, [userdb]);
    const { users, totalPages, currentPage, isLoading, isError, error, refetch } = useFetchUsers(queryParams);
    const axiosPublic = useAxiosPublic();
    const [searchInput, setSearchInput] = useState(queryParams.searchTerm);
    console.log(users);
    const handleSearch = () => {
        setQueryParams((prev) => ({ ...prev, searchTerm: searchInput }));
        refetch();
    };

    const handlePagination = (page) => {
        if (page >= 1 && page <= totalPages) {
            setQueryParams((prev) => ({
                ...prev,
                page,
            }));
            refetch();
        }
    };

    const handleFilterChange = (e) => {
        setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
    };
    const handleStatusChange = async (userId, isDone) => {
        try {
            // Prepare the new messageDate
            const messageDate = isDone ? new Date().toISOString() : null;

            // Send the patch request
            const response = await axiosPublic.patch(`/users/${userId}`, {
                isMessageDone: isDone,
                messageDate: messageDate,
            });
            console.log(response);
            if (response.data.success) {
                toast.success('Message status updated successfully!');
                refetch();
            }
        } catch (error) {
            console.error("Error updating message status", error);
        }
    };



    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;
    console.log(users);

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">User Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search users"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
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
                <div>
                    <select
                        name="isMessageDone"
                        value={queryParams.isMessageDone}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value={null}>Filter by Message Done</option>
                        <option value={true}>Done</option>
                        <option value={false}>Pending</option>
                    </select>
                </div>
            </div>
            <button
                onClick={handleSearch}
                className="bg-secondary text-white px-8 font-semibold py-2 rounded-full hover:bg-primary mb-4"
            >
                Search
            </button>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">userID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Whatsapp</th>
                        <th className="border px-4 py-2">Refer</th>
                        <th className="border px-4 py-2">R. GL</th>
                        <th className="border px-4 py-2">Message</th>
                        <th className="border px-4 py-2">Message Done</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="border px-4 py-2">{user.userID}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                            <td className="border px-4 py-2">
                                {userdb.permission && user.whatsapp ? (
                                    <a
                                        href={`https://wa.me/${user.whatsapp.replace(/[\s()-]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {user.whatsapp}
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>

                            <td className="border px-4 py-2">{user.reference?.userID}</td>
                            <td className="border px-4 py-2">{user.reference?.groupLeader?.name}</td>
                            <td className="border px-4 py-2">
                                <select
                                    className="border rounded px-2 py-1"
                                    value={user.isMessageDone ? "true" : "false"} // Ensure value matches boolean
                                    onChange={(e) => handleStatusChange(user.userID, e.target.value === "true")}
                                >
                                    <option value="true">Done</option>
                                    <option value="false">Pending</option>
                                </select>
                            </td>


                            <td className="border px-4 py-2">
                                {user.messageDate ? (
                                    new Date(user.messageDate).toLocaleDateString()
                                ) : (
                                    "No Date"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

        </div >
    );
};

export default ConsultantUserManagement;
