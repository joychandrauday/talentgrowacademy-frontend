import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useUser from '../../../Others/Register/useUser';
import toast from 'react-hot-toast';

const RequestUserConsultant = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null); // Stores the fetched user data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false); // To show the loading state while requesting the lead

    const axiosPublic = useAxiosPublic();
    const { userdb } = useUser();

    const handleSearchChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSearch = async () => {
        if (!userId.trim()) {
            alert('Please enter a valid User ID, email, or name to search.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setUserData(null); // Reset previous data

        try {
            const response = await axiosPublic.get(`/users/search/${userId}`); // Replace with your API endpoint to fetch user data
            setUserData(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user data.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestLead = async () => {
        if (userdb._id === userData.consultant) {
            alert('This lead is already assigned to you!');
            return;
        }

        setIsRequesting(true);

        try {
            const requestPayload = {
                requestBy: userdb._id,  // Current user making the request
                userId: userData._id,  // The user for whom the lead is being requested
                status: 'pending'       // Request is in a pending state initially
            };
            console.log(requestPayload.requestBy);
            const response = await axiosPublic.post('/requests', requestPayload); // Send the request to the backend
            if (response.status === 201) {

                toast.success('Lead request sent successfully!');
            } else {
                toast.error('Lead request failed.')
            }

        } catch (err) {
            toast.error('Failed to send lead request. Please try again.');
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    placeholder="Search by user ID, email, or name"
                    value={userId}
                    onChange={handleSearchChange}
                    className="border p-2 rounded-lg w-64 shadow-md shadow-gray-400 px-4"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-secondary drop-shadow-lg text-white rounded-lg hover:bg-primary transition duration-300"
                >
                    Search
                </button>
            </div>

            {isLoading && (
                <div className="text-center text-gray-500">Loading user data...</div>
            )}
            {error && (
                <div className="text-center text-red-500">Error: {error}</div>
            )}

            <section className="bg-gray-800 p-6 text-white text-center rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold p-6 mb-4">User Profile</h1>
                {userData ? (
                    <div className="space-y-4 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-20 h-20 bg-gray-600 rounded-full overflow-hidden">
                                <img
                                    src={userData.avatar || '/default-avatar.png'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p>
                                    <strong>Name:</strong> {userData.name || 'N/A'}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userData.email || 'N/A'}
                                </p>
                                <p>
                                    <strong>userID:</strong> {userData.userID || 'N/A'}
                                </p>
                                <p>
                                    <strong>Consultant:</strong> {userData.consultant || 'N/A'}
                                </p>
                                <p>
                                    <strong>Role:</strong> {userData.role || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleRequestLead}
                            className="mt-4 border-none w-full btn bg-secondary"
                            disabled={userdb._id === userData.consultant || isRequesting}
                        >
                            {userdb._id === userData.consultant && "already yours"}
                            {userData.consultant === null && (isRequesting ? "Requesting..." : "Request the Lead")}
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-400">
                        No user data available. Please search for a valid user.
                    </p>
                )}
            </section>
        </div>
    );
};

RequestUserConsultant.propTypes = {
    singleuser: PropTypes.object,
};

export default RequestUserConsultant;
