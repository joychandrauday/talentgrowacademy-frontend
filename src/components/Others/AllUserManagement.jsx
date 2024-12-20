import { useState } from 'react';
import Swal from 'sweetalert2';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import useFetchUsers from '../../Hooks/useFetchUsers';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { TbClockCheck } from 'react-icons/tb';

const AllUserManagement = () => {
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

    const activateUser = async (userID) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This will activate the user.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, activate!',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                await axiosPublic.patch(`/users/${userID}`, { status: 'active' });
                Swal.fire('Activated!', 'The user has been activated.', 'success');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to activate the user.', 'error');
            console.error(err);
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
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{user.userID}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                            <td className="border px-4 py-2">{user.trainer.name}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">{user.status}</td>
                            <td className="border px-4 py-2">
                                {user.status === 'inactive' ? (
                                    <div className="relative group">
                                        <button
                                            onClick={() => activateUser(user.userID)}
                                            className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                        >
                                            <TbClockCheck />
                                        </button>
                                    </div>
                                ) : <div className="relative group">
                                    <button
                                        className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                    >
                                        <IoCheckmarkCircleSharp />
                                    </button>
                                </div>
                                }

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

export default AllUserManagement;
