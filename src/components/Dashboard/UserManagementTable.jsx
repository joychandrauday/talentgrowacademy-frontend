import { useState } from "react";
import PropTypes from "prop-types";

const UserManagementTable = ({ users, role }) => {
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // Filtered users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesId = searchId ? user.userID.includes(searchId) : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    const matchesDate =
      dateRange.from && dateRange.to
        ? new Date(user.createdAt) >= new Date(dateRange.from) &&
          new Date(user.createdAt) <= new Date(dateRange.to)
        : true;

    return matchesId && matchesStatus && matchesDate;
  });

  // Count for the cards
  const activeCount = users.filter((user) => user.status === "active").length;
  const inactiveCount = users.filter(
    (user) => user.status === "inactive"
  ).length;
  const totalCount = users.length;

  return (
    <div className="space-y-6 w-[940px] ">
      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card shadow-md bg-primary text-primary-content rounded-lg p-6 flex items-center justify-center">
          <div>
            <h2 className="card-title text-xl font-semibold text-center sm:text-left">
              Active Users
            </h2>
            <p className="text-4xl font-bold text-center sm:text-left mt-2">
              {activeCount}
            </p>
          </div>
        </div>
        <div className="card shadow-md bg-secondary text-secondary-content rounded-lg p-6 flex items-center justify-center">
          <div>
            <h2 className="card-title text-xl font-semibold text-center sm:text-left">
              Inactive Users
            </h2>
            <p className="text-4xl font-bold text-center sm:text-left mt-2">
              {inactiveCount}
            </p>
          </div>
        </div>
        <div className="card shadow-md bg-accent text-accent-content rounded-lg p-6 flex items-center justify-center">
          <div>
            <h2 className="card-title text-xl font-semibold text-center sm:text-left">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-center sm:text-left mt-2">
              {totalCount}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by User ID"
          className="input input-bordered w-full"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange({ ...dateRange, from: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra min-wf">
          <thead>
            <tr>
              <th className="whitespace-nowrap">Date</th>
              <th className="whitespace-nowrap">User ID</th>
              <th className="whitespace-nowrap hidden md:table-cell">Name</th>
              <th className="whitespace-nowrap">Phone</th>
              <th className="whitespace-nowrap hidden lg:table-cell">
                WhatsApp
              </th>
              <th className="whitespace-nowrap hidden md:table-cell">Refer</th>
              <th className="whitespace-nowrap hidden lg:table-cell">
                Group Leader
              </th>
              <th className="whitespace-nowrap hidden lg:table-cell">
                GL WhatsApp
              </th>
              <th className="whitespace-nowrap">Message Done</th>
              <th className="whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.userID}>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.userID}</td>
                <td className="hidden md:table-cell">{user.name}</td>
                <td>{user.phone}</td>
                <td className="hidden lg:table-cell">{user.whatsapp}</td>
                <td className="hidden md:table-cell">{user.referrence}</td>
                <td className="hidden lg:table-cell">{user.groupLeader}</td>
                <td className="hidden lg:table-cell">{user.whatsapp}</td>
                <td>{user.messageDone ? "Yes" : "No"}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UserManagementTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      whatsapp: PropTypes.string.isRequired,
      referrence: PropTypes.string.isRequired,
      groupLeader: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      messageDone: PropTypes.bool.isRequired,
    })
  ).isRequired,
  role: PropTypes.string.isRequired,
};

export default UserManagementTable;
