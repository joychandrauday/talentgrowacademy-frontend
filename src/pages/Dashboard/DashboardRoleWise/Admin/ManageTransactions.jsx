import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Use navigate and location hooks
import useTransactions from "../../../../Hooks/Transactions/useTransactions";
import ManageWithdrawal from "./ManageWithdrawal";
import MoneyAllocation from "./MoneyAllocation";

const ManageTransactions = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState("timestamp");
    const [sortOrder, setSortOrder] = useState("desc");

    const navigate = useNavigate(); // Replaces useHistory
    const location = useLocation();

    // Extract activeTab from URL
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get("tab") || "all-transactions"; // Default to "all-transactions"
    const [activeTab, setActiveTab] = useState(initialTab);

    const { transactions, isLoading, isError, error } = useTransactions({
        page,
        limit,
        sortBy,
        sortOrder,
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

    const tabs = [
        { id: "all-transactions", name: "All Transactions" },
        { id: "manage-withdrawal", name: "Manage Withdrawal" },
        { id: "money-allocate", name: "Money Allocate" },
    ];

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        navigate(`?tab=${tabId}`); // Update the URL query parameter
    };

    useEffect(() => {
        setActiveTab(initialTab); // Ensure state syncs with the URL on mount or reload
    }, [initialTab]);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-5 min-h-screen w-full">
            <h1 className="text-2xl font-bold text-center mb-5">Manage Transactions</h1>

            {/* Tabs */}
            <div className="flex justify-center space-x-5 mb-5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-4 py-2 rounded ${activeTab === tab.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            } hover:bg-blue-400 hover:text-white transition`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "all-transactions" && (
                <div className="w-full">
                    {/* Transactions Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th>User Id</th>
                                    <th
                                        className="p-3 cursor-pointer"
                                        onClick={() => handleSort("amount")}
                                    >
                                        Amount
                                    </th>
                                    <th
                                        className="p-3 cursor-pointer"
                                        onClick={() => handleSort("timestamp")}
                                    >
                                        Date
                                    </th>
                                    <th
                                        className="p-3 cursor-pointer"
                                        onClick={() => handleSort("status")}
                                    >
                                        Status
                                    </th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.referenceId}
                                        className="text-center border-b"
                                    >
                                        <td className="p-3">{transaction.userId}</td>
                                        <td className="p-3">
                                            {transaction.type === "credit" ? "+" : "-"}
                                            {transaction.amount}
                                        </td>
                                        <td className="p-3">
                                            {new Date(transaction.timestamp).toLocaleDateString()}|{new Date(transaction.timestamp).toLocaleTimeString()}
                                        </td>
                                        <td className="p-3">{transaction.status}</td>
                                        <td className="p-3 capitalize">{transaction.type}</td>
                                        <td className="p-3 capitalize">{transaction.description}</td>
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
            )}

            {activeTab === "manage-withdrawal" && (
                <ManageWithdrawal
                />
            )}

            {activeTab === "money-allocate" && (
                <MoneyAllocation />
            )}
        </div>
    );
};

export default ManageTransactions;
