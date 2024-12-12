import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetchUsers from '../../../Hooks/useFetchUsers';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ControllerAssignModal = ({ user, onClose, refetch }) => {
    const queryParams = {
        role: 'trainer',
    };
    const { users } = useFetchUsers(queryParams);
    const axiosPublic = useAxiosPublic()
    const [selectedTrainer, setSelectedTrainer] = useState('');

    const handleAssign = async () => {
        if (!selectedTrainer) {
            Swal.fire('Error', 'Please select a trainer!', 'error');
            return;
        }
        try {
            // Call API to assign user to the selected trainer
            // Replace with your actual API logic
            await axiosPublic.patch(`/users/${user.userID}`, { trainer: selectedTrainer });
            Swal.fire('Success', `User ${user.name} has been assigned to trainer!`, 'success');
            refetch()
            onClose(); // Close the modal
        } catch (error) {
            Swal.fire('Error', 'Failed to assign trainer. Please try again.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Assign Trainer</h2>
                <p className="text-gray-700 mb-4">
                    Assign <span className="font-semibold">{user.name}</span> to a trainer.
                </p>
                <div className="mb-4">
                    <label htmlFor="trainerSelect" className="block text-gray-600 mb-2">
                        Select Trainer
                    </label>
                    <select
                        id="trainerSelect"
                        value={selectedTrainer}
                        onChange={(e) => setSelectedTrainer(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary"
                    >
                        <option value="" disabled>
                            -- Choose a trainer --
                        </option>
                        {users?.map((trainer) => (
                            <option key={trainer.userID} value={trainer.userID}>
                                {trainer.name} ({trainer.userID})
                            </option>
                        ))}
                    </select>
                </div>
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
                        Assign
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
};

export default ControllerAssignModal;
