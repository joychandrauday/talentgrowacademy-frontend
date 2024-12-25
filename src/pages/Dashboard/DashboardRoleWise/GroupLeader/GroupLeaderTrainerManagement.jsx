import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import useFetchAdmin from '../../../../Hooks/useFetchAdmin';
import useUser from '../../../Others/Register/useUser';
import AssignModal from '../../../../Hooks/AssignModal';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const GroupLeaderTrainerManagement = () => {
    const { userdb } = useUser()
    console.log(userdb._id);
    const [trainers, setTrainers] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [assignedEndpoint, setAssignEndpoint] = useState('')
    const [queryParams, setQueryParams] = useState({})
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        if (!userdb || !userdb._id) {
            // If userdb or userdb._id is undefined, we return early and do not make the fetch request
            console.log('Waiting for user data...');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/admins/alladmins`, {
                    params: {
                        role: 'trainer',
                        groupLeader: userdb._id,
                    },
                });
                setTrainers(response.data.data.results)
                console.log('Fetched dataaaaa:', response.data.data.results);
                // You can store data in state or do something with it
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function
    }, [userdb]); // Add userdb as a dependency to re-run when userdb changes
    // set up assignEndpoint route
    useEffect(() => {
        setAssignEndpoint(`/group-leaders/assigntrainer`);
    }, [selectedUser]);

    // Handle assign click event and open the modal
    const handleAssignClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };
    const handleConfirmAssign = async (user) => {
        console.log('Assigning user:', user);
        // Call the backend to assign the user

    };
    const handleModalClose = () => {
        console.log("Closing modal...");
        setModalOpen(false);
    };
    // is loading 
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Manage Administration</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search users"
                        // value={filters.searchTerm}
                        // onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div>
                    <select
                        name="status"
                        // value={filters.status}
                        // onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Filter by Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <select
                        name="role"
                        // value={filters.role}
                        // onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        name="fromDate"
                        // value={filters.fromDate}
                        // onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="date"
                        name="toDate"
                        // value={filters.toDate}
                        // onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
            </div>
            <button
                // onClick={handleSearch}
                className="bg-secondary text-white px-8 font-semibold py-2 rounded-full hover:bg-primary mb-4"
            >
                Search
            </button>

            {/* Table */}

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">userID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.userID}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">{user.status}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="px-4 py-2 border rounded text-white bg-blue-600 hover:bg-blue-700"
                                        onClick={() => handleAssignClick(user._id)}
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assign Modal */}
            {isModalOpen && (
                <AssignModal
                    handleModalClose={handleModalClose}
                    assignTo={selectedUser}
                    assignEndpoint={assignedEndpoint}
                    onConfirm={handleConfirmAssign}
                    queryParams={{ groupLeader: userdb._id, status: 'active', trainer: 'null' }}
                />
            )}

        </div>
    );
};

GroupLeaderTrainerManagement.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.object,
};

export default GroupLeaderTrainerManagement;
