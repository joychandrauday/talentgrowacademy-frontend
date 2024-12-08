import { useState } from "react";

const Passbook = () => {
  const transactions = [
    {
      date: "2024-11-30",
      method: "Bank Transfer",
      number: "TRX123456",
      amount: 5000,
      status: "credit",
    },
    {
      date: "2024-11-29",
      method: "Cash",
      number: "TRX123457",
      amount: 2000,
      status: "debit",
    },
    {
      date: "2024-11-28",
      method: "UPI",
      number: "TRX123458",
      amount: 3500,
      status: "credit",
    },
    {
      date: "2024-11-27",
      method: "Card Payment",
      number: "TRX123459",
      amount: 1000,
      status: "debit",
    },
  ];

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const filteredTransactions = transactions.filter((tx) => {
    const isStatusMatch = statusFilter === "all" || tx.status === statusFilter;
    const isDateInRange =
      (!dateRange.from || new Date(tx.date) >= new Date(dateRange.from)) &&
      (!dateRange.to || new Date(tx.date) <= new Date(dateRange.to));
    return isStatusMatch && isDateInRange;
  });

  return (
    <div className="p-6  text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-primary italic text-2xl capitalize font-bold">
          Debit and Credit History
        </h1>
        <h4 className="text-sm text-primary italic">
          Manage your credit and debit transactions.
        </h4>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col">
          <select
            className="border border-secondary text-primary p-2 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Method</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div className="flex flex-col">
          <input
            type="date"
            className=" text-primary border border-secondary p-2 rounded-md"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange({ ...dateRange, from: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <input
            type="date"
            className="border-secondary border text-primary p-2 rounded-md"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-[#F8F9FA] shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#2B6777] text-white">
              <th className="p-4 text-sm font-medium tracking-wide uppercase">
                Date
              </th>
              <th className="p-4 text-sm font-medium tracking-wide uppercase">
                Method
              </th>
              <th className="p-4 text-sm font-medium tracking-wide uppercase">
                Transaction Number
              </th>
              <th className="p-4 text-sm font-medium tracking-wide uppercase">
                Amount (৳)
              </th>
              <th className="p-4 text-sm font-medium tracking-wide uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C8D8E4]">
            {filteredTransactions.map((tx, index) => (
              <tr
                key={index}
                className="hover:bg-[#C8D8E4] transition-colors duration-200"
              >
                <td className="p-4 text-[#2B6777] text-sm">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-[#2B6777] text-sm">{tx.method}</td>
                <td className="p-4 text-[#2B6777] text-sm">{tx.number}</td>
                <td className="p-4 text-[#2B6777] text-sm font-semibold">
                  ৳{tx.amount.toLocaleString()}
                </td>
                <td
                  className={`p-4 text-sm font-semibold rounded-lg px-2 py-1 text-center ${
                    tx.status === "credit"
                      ? "bg-[#F2A154] text-white"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-[#2B6777] text-sm italic"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Passbook;
