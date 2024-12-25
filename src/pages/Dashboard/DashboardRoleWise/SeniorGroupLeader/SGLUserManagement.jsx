import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { TbClockCheck } from 'react-icons/tb';
import useUser from '../../../Others/Register/useUser';
import useFetchUsers from '../../../../Hooks/useFetchUsers';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';

const SGLUserManagement = () => {
    const { userdb } = useUser();
    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        role: 'user',
        status: '',
        sort: '-createdAt',
        limit: 10,
        page: 1,
        fromDate: '',
        toDate: '',
        seniorGroupLeader: userdb._id,
    });

    useEffect(() => {
        if (userdb) {
            setQueryParams((prevParams) => ({ ...prevParams, seniorGroupLeader: userdb._id }));
        }
    }, [userdb]);

    const { users, totalPages, currentPage, isLoading, isError, error, refetch } = useFetchUsers(queryParams);
    const axiosPublic = useAxiosPublic();
    const [searchInput, setSearchInput] = useState(queryParams.searchTerm);

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

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;

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
            </div>
            <button
                onClick={handleSearch}
                className="bg-secondary text-white px-4 md:px-8 font-semibold py-2 rounded-full hover:bg-primary mb-4 w-full md:w-auto"
            >
                Search
            </button>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Active Date</th>
                            <th className="border px-4 py-2">UserID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Consultant</th>
                            <th className="border px-4 py-2">G L</th>
                            <th className="border px-4 py-2">Trainer</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Whatsapp</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    {user.status === 'active' ? (
                                        new Date(user.updatedAt).toLocaleDateString()
                                    ) : (
                                        `${user.status}`
                                    )}
                                </td>
                                <td className="border px-4 py-2">{user.userID}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.consultant?.userID || 'N/A'}</td>
                                <td className="border px-4 py-2">{user.groupLeader?.name}</td>
                                <td className="border px-4 py-2">{user.trainer?.userID}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2">{user.whatsapp}</td>
                                <td className="border px-4 py-2">
                                    {user.status === 'active' ? (
                                        <span className="badge badge-warning">Active</span>
                                    ) : (
                                        <span className="badge badge-error text-white capitalize">{user.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
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

export default SGLUserManagement;
