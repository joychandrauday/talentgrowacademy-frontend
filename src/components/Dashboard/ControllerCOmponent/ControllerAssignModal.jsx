import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetchUsers from '../../../Hooks/useFetchUsers';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ControllerAssignModal = ({ user, onClose, refetch }) => {
    const queryParams = {
        role: 'user',
        status: 'inactive',
        consultant: 'null'
    };

    const { users } = useFetchUsers(queryParams);
    const axiosPublic = useAxiosPublic();
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleAssign = async () => {
        if (selectedUsers.length === 0) {
            Swal.fire('Error', 'Please select at least one user!', 'error');
            return;
        }

        try {
            // Create the payload structure
            const payload = {
                identifiers: selectedUsers, // Array of selected user IDs
                data: {
                    consultant: user._id
                },
            };
            console.log(payload);
            // Send the PATCH request to the backend
            const response = await axiosPublic.post('/users/assignconsultant', payload);
            console.log('Assign response', response);
            console.log(response.status, response.data.status);
            if (response.status === 200) {
                Swal.fire(
                    'Success',
                    `${selectedUsers.length} user(s) have been assigned successfully to ${user.name}!`,
                    'success'
                );
                // refetch(); // Refetch the user list
                onClose(); // Close the modal
            } else {
                throw new Error('Failedddddd to assign users. Please try again.');
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failedsss to assign users. Please try again.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <h2 className="text-xl font-bold mb-4">Assign Users to Consultant</h2>
                <p className="text-gray-700 mb-4">
                    Select users to assign them to <span className="font-semibold">{user.name}</span>.
                </p>

                {/* Users Table */}
                {users.length > 0 ? (
                    <table className="table-auto w-full border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Select</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">userID</th>
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

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssign}
                        className="px-4 py-2 bg-secondary text-white rounded hover:bg-primary"
                    >
                        Assign ({selectedUsers.length}) users
                    </button>
                </div>
            </div>
        </div>
    );
};

ControllerAssignModal.propTypes = {
    user: PropTypes.object.isRequired, // The user being assigned
    onClose: PropTypes.func.isRequired, // Function to close the modal
    refetch: PropTypes.func.isRequired, // Function to refetch the users list
    motherUser: PropTypes.string.isRequired, // The consultant ID to assign users to
};

export default ControllerAssignModal;
