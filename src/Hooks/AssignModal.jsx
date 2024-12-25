import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosPublic from './useAxiosPublic';
import useFetchUsers from './useFetchUsers';

const AssignModal = ({
    handleModalClose,
    assignTo,
    assignEndpoint,
    queryParams,
}) => {
    const { users, isLoading, isError } = useFetchUsers(queryParams);
    console.log(users);
    const axiosPublic = useAxiosPublic();
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAssign = async () => {
        if (selectedUsers.length === 0) {
            Swal.fire('Error', 'Please select at least one user!', 'error');
            return;
        }

        try {
            const payload = { identifiers: selectedUsers, gl: assignTo };
            console.log(payload);
            const response = await axiosPublic.post(assignEndpoint, payload);
            console.log();
            if (response.data.result.modifiedCount > 0) {
                Swal.fire(
                    'Success',
                    `${selectedUsers.length} user(s) have been assigned successfully!`,
                    'success'
                );
                handleModalClose();
            } else {
                throw new Error('Failed to assign users.');
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Assignment failed.', 'error');
            console.log(error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading users.</p>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 ">
                <h2 className="text-xl font-bold mb-4">Assign Users</h2>
                <p className="text-gray-700 mb-4">Select users to assign them.</p>

                {users.length > 0 ? (
                    <table className="table-auto w-full border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Select</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">User ID</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Whatsapp</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleCheckboxChange(user._id)}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.userID}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className="border px-4 py-2">{user.whatsapp}</td>
                                    <td className="border px-4 py-2">{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No users available to assign.</p>
                )}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleModalClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssign}
                        className="px-4 py-2 bg-secondary text-white rounded hover:bg-primary"
                    >
                        Assign ({selectedUsers.length}) Users
                    </button>
                </div>
            </div>
        </div>
    );
};

AssignModal.propTypes = {
    handleModalClose: PropTypes.func.isRequired,
    assignTo: PropTypes.object,
    assignEndpoint: PropTypes.string.isRequired,
    queryParams: PropTypes.object,
    refetch: PropTypes.func.isRequired,
};

export default AssignModal;
