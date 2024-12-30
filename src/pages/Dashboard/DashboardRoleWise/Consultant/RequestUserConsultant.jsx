import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useUser from '../../../Others/Register/useUser';
import toast from 'react-hot-toast';
import useFetchUsers from '../../../../Hooks/useFetchUsers';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import { ScrollRestoration } from 'react-router-dom';

const RequestUserConsultant = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null); // Stores the fetched user data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false); // To show the loading state while requesting the lead

    const axiosPublic = useAxiosPublic();
    const { userdb } = useUser();
    const [requests, setRequests] = useState([]);
    // Fetch requests from the backend API
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axiosPublic.get('/requests');  // Adjust API endpoint if needed
                setRequests(response.data.data);  // Assuming response contains a 'data' field with requests
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);
    const myRequests = requests.filter(request => request?.requestBy?._id === userdb._id);

    if (isLoading) return <LoadingSpinner />;
    const handleSearchChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSearchRequst = async () => {
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
        if (userdb?._id === userData?.consultant?._id) {
            alert('This lead is already assigned to you!');
            return;
        }

        setIsRequesting(true);

        try {
            const requestPayload = {
                requestBy: userdb._id, // Current user making the request
                userId: userData._id, // The user for whom the lead is being requested
                status: 'pending', // Request is in a pending state initially
            };
            const response = await axiosPublic.post('/requests', requestPayload); // Send the request to the backend
            if (response.status === 201) {
                toast.success('Lead request sent successfully!');
            }
        } catch (err) {
            // Handle specific status codes
            if (err.response && err.response.status === 400) {
                toast.error('Lead request failed.');
            } else {
                toast.error('Failed to send lead request. Please try again.');
            }
        } finally {
            setIsRequesting(false);
        }

    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">
                    Request an inactive user.
                </h1>
                <h4 className="text-sm text-primary italic">
                    Manage your user Request.
                </h4>
            </div>
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    placeholder="Search by user ID, email, or name"
                    value={userId}
                    onChange={handleSearchChange}
                    className="border p-2 rounded-lg w-64 shadow-md shadow-gray-400 px-4"
                />
                <button
                    onClick={handleSearchRequst}
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
            {userData ? (

                <div className="max-w-md mx-auto bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-lg text-white p-6">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 bg-gray-600 rounded-full overflow-hidden shadow-md">
                            <img
                                src={userData.avatar || '/default-avatar.png'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold">{userData.name || 'N/A'}</h2>
                        <p className="text-sm text-gray-300">{`UserID: ${userData?.userID || 'N/A'}`}</p>
                        <p className="text-sm text-gray-300">{`Status: ${userData?.status || 'N/A'}`}</p>
                    </div>

                    {/* Information Section */}
                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">Date:</span>
                            <span>{userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">Phone:</span>
                            <span>{userData.phone || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">WhatsApp:</span>
                            <span>{userData.whatsapp || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">Refer:</span>
                            <span>{`${userData.reference?.name || 'N/A'} (${userData.reference?.userID || 'N/A'})`}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">Consultant:</span>
                            <span>{`${userData.consultant?.name || 'N/A'} (${userData.consultant?.phone || 'N/A'})`}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">Group Leader:</span>
                            <span>{userData.groupLeader?.name || 'N/A'} <br /> ({userData.groupLeader?.phone || 'N/A'})</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">Message Done:</span>
                            <span className='flex justify-end'>{userData.isMessageDone ? new Date(userData.messageDate).toLocaleDateString() : 'No'}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                            <span className="font-medium">WhatsApp Verified:</span>
                            <span>{userData.isWhatsApp ? 'Right' : 'Wrong'}</span>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleRequestLead}
                        className={`mt-6 w-full py-2 rounded-lg shadow-md text-sm font-semibold transition ${userdb._id === userData.consultant?._id
                            ? "bg-gray-600 cursor-not-allowed"
                            : userData.consultant === null
                                ? isRequesting
                                    ? "bg-yellow-500 text-gray-800"
                                    : "bg-secondary text-white hover:bg-secondary-focus"
                                : "bg-red-500 cursor-not-allowed"
                            }`}
                        disabled={userdb._id === userData.consultant?._id || isRequesting || userData.status === 'active'}
                    >
                        {userdb._id === userData.consultant?._id
                            ? "Already Yours"
                            : "Request the Lead"
                        }
                    </button>
                </div>


            ) : (
                <p className="text-gray-400">
                    No user data available. Please search for a valid user.
                </p>
            )
            }

            <div className="overflow-x-auto mt-5">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">userID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Whatsapp</th>
                            <th className="border px-4 py-2">R. Name</th>
                            <th className="border px-4 py-2">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {myRequests.length && myRequests.map((request) => (
                            <tr key={request._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">{request.userId?.userID}</td>
                                <td className="border px-4 py-2">{request.userId?.name}</td>
                                <td className="border px-4 py-2">{request.userId?.whatsapp}</td>
                                <td className="border px-4 py-2">{request.requestBy?.name}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`badge rounded-full ${request.status === "accept"
                                            ? "bg-green-500"
                                            : request.status === "reject"
                                                ? "bg-red-800"
                                                : "bg-yellow-500"
                                            } text-white`}
                                    >
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <ScrollRestoration />
        </div >
    );
};

RequestUserConsultant.propTypes = {
    singleuser: PropTypes.object,
};

export default RequestUserConsultant;
