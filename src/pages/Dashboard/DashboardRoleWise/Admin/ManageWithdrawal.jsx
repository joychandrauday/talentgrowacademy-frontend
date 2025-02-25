import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTransactions from '../../../../Hooks/Transactions/useTransactions';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useUser from '../../../Others/Register/useUser';

const ManageWithdrawal = () => {
    const { userdb } = useUser();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState("timestamp");
    const [sortOrder, setSortOrder] = useState("desc");
    const [statusFilter, setStatusFilter] = useState(""); // New state for status filter
    const axiosPublic = useAxiosPublic();
    const { transactions, isLoading, isError, error, refetch } = useTransactions({
        page,
        limit,
        sortBy,
        sortOrder,
        type: 'debit',
        withdraw: true,
        status: statusFilter, // Pass the status filter to the hook
    });

    const handleSort = (sortField) => {
        setSortBy(sortField);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handlePagination = (direction) => {
        if (direction === "next") {
            setPage((prev) => prev + 1);
        } else if (direction === "prev" && page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const updateStatus = async (transactionId, newStatus, userId) => {
        try {
            const loadingSwal = Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we process the transaction.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axiosPublic.put('/transactions/update-status', {
                transactionId,
                status: newStatus,
                userId
            });
            loadingSwal.close();
            if (response.status === 200) {
                Swal.fire({
                    title: `Transaction ${newStatus}!`,
                    icon: 'success',
                    timer: 1500,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Something went wrong',
                icon: 'error',
                timer: 1500,
            });
        }
    };

    const handleAction = (transactionId, action, userId, transaction) => {
        const status = action === 'completed' ? 'completed' : 'rejected';
        Swal.fire({
            title: `Are you sure you want to ${action} this request?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: action === 'completed' ? '#4caf50' : '#f44336',
            cancelButtonColor: '#d33',
            confirmButtonText: action === 'completed' ? 'Yes, Approve' : 'Yes, Reject',
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus(transactionId, status, userId, transaction);
            }
        });
    };

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setPage(1); // Reset page to 1 whenever filter changes
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-5 min-h-screen w-full">
            <h1 className="text-2xl font-bold text-center mb-5">Manage Withdrawal</h1>

            <div className="w-full">
                {/* Filter */}
                <div className="flex justify-between items-center mb-5">
                    <label className="text-gray-700">
                        Filter by Status:
                        <select
                            value={statusFilter}
                            onChange={handleFilterChange}
                            className="ml-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </label>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>User Id</th>
                                <th className="p-3 cursor-pointer" onClick={() => handleSort("amount")}>
                                    Amount
                                </th>
                                <th className="p-3 cursor-pointer" onClick={() => handleSort("timestamp")}>
                                    Date
                                </th>
                                <th className="p-3 cursor-pointer" onClick={() => handleSort("status")}>
                                    Status
                                </th>
                                <th className="p-3">Withdraw Account</th>
                                <th className="p-3">Method</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.referenceId} className="text-center border-b">
                                    <td className="p-3">{transaction.foreignUser ? transaction.showingId : 'N/A'}</td>
                                   <td className="p-3">
    {transaction.type === "credit"
        ? `+${transaction.amount}`
        : transaction.type === "debit"
        ? `-${transaction.amount}`
        : transaction.amount
    }
</td>
                                    <td className="p-3">
                                        {new Date(transaction.timestamp).toLocaleDateString()}|{new Date(transaction.timestamp).toLocaleTimeString()}
                                    </td>
                                    <td className="p-3">{transaction.status}</td>
                                    <td className="p-3">{transaction.withdrawAccount || "N/A"}</td>
                                    <td className="p-3 capitalize">{transaction.method || "N/A"}</td>
                                    {transaction.status !== 'pending' ? <div className="opacity-60">completed</div> : <td className="p-3 flex justify-center items-center gap-2">
                                        <button
                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                                            onClick={() => handleAction(transaction._id, "completed", transaction.userId)}
                                            disabled={transaction.status === 'completed'}
                                        >
                                            <FaCheck />
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                                            onClick={() => handleAction(transaction._id, "rejected", transaction.userId, transaction)}
                                            disabled={transaction.status === 'completed'}
                                        >
                                            <FaTimes />
                                        </button>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-5">
                    <button
                        onClick={() => handlePagination("prev")}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
                        disabled={page <= 1}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {page}</span>
                    <button
                        onClick={() => handlePagination("next")}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

ManageWithdrawal.propTypes = {};

export default ManageWithdrawal;
