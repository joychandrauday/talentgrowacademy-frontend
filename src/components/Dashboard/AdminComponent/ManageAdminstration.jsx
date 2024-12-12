import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ManageAdministration = () => {
    const axiosPublic = useAxiosPublic();

    // State to manage search term, page, and limit
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Fetch data using TanStack Query
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', page, limit, searchTerm],  // include page and limit in queryKey to trigger re-fetch
        queryFn: async () => {
            const response = await axiosPublic.get(`/admins`);
            return response.data;
        },
    });
    console.log(data);
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    // handle delete using swal 
    const handleDeleteUser = async (userID) => {
        const { value: confirm } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm) {
            await axiosPublic.delete(`/users/${userID}`);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            refetch(); // refetch after deletion
        }
    };

    // Handle block user
    const handleBlockUser = async (userID) => {
        const { value: confirm } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block it!',
        });

        if (confirm) {
            await axiosPublic.patch(`/users/${userID}`, { 'status': 'blocked' });
            Swal.fire('Blocked!', 'User has been blocked.', 'success');
            refetch(); // refetch after blocking user
        }
    };

    // Handle search
    const handleSearch = () => {
        setPage(1); // reset to the first page when search is performed
        refetch();  // Trigger the query to refetch data with the new search term
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch();  // Refetch data when page is changed
    };

    return (
        <div className="p-4 overflow-x-auto">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">
                    Administrative User Management
                </h1>
                <h4 className="text-sm text-primary italic">
                    Manage all administrative credentials.
                </h4>
            </div>

            {/* Search Section */}
            <div className="mb-4 flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by name, email, or user ID"
                    className="input input-bordered w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="btn bg-primary text-white btn-sm"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* User Table */}
            <table className="table table-xs">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Country</th>
                        <th>User ID</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.admins.map((user) => (
                        <tr key={user.userID} className="hover:bg-gray-50 text-center">
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>{user.country}</td>
                            <td>{user.userID}</td>
                            <td>{user.balance}</td>
                            <td>
                                <button
                                    className="btn bg-primary text-white btn-sm w-full"
                                    onClick={() => handleBlockUser(user.userID)}
                                >
                                    Block
                                </button>
                                <button
                                    className="btn bg-secondary text-white btn-sm w-full"
                                    onClick={() => handleDeleteUser(user.userID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="btn bg-secondary text-white btn-sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    className="btn bg-secondary text-white btn-sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={data?.data.length < limit}  // Disable next if fewer users than the limit
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageAdministration;
