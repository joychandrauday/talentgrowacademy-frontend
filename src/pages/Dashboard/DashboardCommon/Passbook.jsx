import { useEffect, useState } from "react";
import useUser from "../../Others/Register/useUser";
import useSingleTransaction from "../../../Hooks/Transactions/useSingleTransaction";

const Passbook = () => {
  const { userdb } = useUser();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [typeFilter, setTypeFilter] = useState("all");
  const [referenceId, setReferenceId] = useState("");

  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const params = {
      userId: userdb?._id,
      page,
      limit,
      sortBy,
      sortOrder,
      status: statusFilter,
      type: typeFilter,
      fromDate: dateRange.from,
      toDate: dateRange.to,
      referenceId,
    };
    setQueryParams(params);
  }, [userdb, page, limit, sortBy, sortOrder, statusFilter, typeFilter, dateRange, referenceId]);

  const {
    transactions,
    isLoading,
    isError,
    error,
    totalPages,
    currentPage,
    refetch,
  } = useSingleTransaction(queryParams);

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setPage((prev) => prev + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") setStatusFilter(value);
    else if (name === "type") setTypeFilter(value);
    else if (name === "fromDate") setDateRange((prev) => ({ ...prev, from: value }));
    else if (name === "toDate") setDateRange((prev) => ({ ...prev, to: value }));
    else if (name === "referenceId") setReferenceId(value);
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-primary italic text-2xl capitalize font-bold">
          Debit and Credit History
        </h1>
        <h4 className="text-sm text-primary italic">
          Manage your credit and debit transactions.
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 justify-between justify-items-between">
        <div>
          <select
            name="status"
            className="w-full border border-secondary  text-primary p-2 rounded-md"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <input
            type="date"
            name="fromDate"
            value={dateRange.from}
            onChange={handleFilterChange}
            className="border border-gray-700  text-primary w-full rounded p-2 w-full"
          />
          <input
            type="date"
            name="toDate"
            value={dateRange.to}
            onChange={handleFilterChange}
            className="border border-gray-700  text-primary w-full rounded p-2 w-full"
          />
        </div>

        <div>
          <select
            name="type"
            className="border border-secondary  text-primary w-full p-2 rounded-md"
            value={typeFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            name="referenceId"
            className=" border border-secondary text-primary w-full p-2 rounded-md"
            placeholder="Search by Reference ID"
            value={referenceId}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error?.message}</div>}

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-gray-800 text-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700">
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("timestamp")}
              >
                Date
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("method")}
              >
                Reference ID
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
              >
                Type
              </th>
              <th className="py-3 px-6 text-left">Account Number</th>
              <th className="py-3 px-6 text-left">Method</th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount (৳)
              </th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 ? (
              transactions.map((tx, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-6">
                    {new Date(tx.timestamp).toLocaleDateString()}|{new Date(tx.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-6">{tx.foreignUser}</td>
                  <td className="py-3 px-6">{tx.type}</td>
                  <td className="py-3 px-6">{tx.withdrawAccount ? tx.
                    withdrawAccount : ''}</td>
                  < td className="py-3 px-6">{tx.method}</td>
                  <td className="py-3 px-6">{tx.amount}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded text-xs ${tx.status === "completed"
                        ? "bg-green-500 text-white"
                        : tx.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                        }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">{tx.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePagination("prev")}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination("next")}
          disabled={transactions?.length < limit}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Passbook;
