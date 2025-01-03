import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

const ControllerRequest = () => {
    const [requests, setRequests] = useState([]); // State to store the requests
    const [filteredRequests, setFilteredRequests] = useState([]); // State for filtered requests
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [loading, setLoading] = useState(true); // Loading state
    const axiosPublic = useAxiosPublic();

    // Fetch requests on component mount
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axiosPublic.get('/requests'); // API endpoint to fetch requests
                const sortedRequests = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRequests(sortedRequests);
                setFilteredRequests(sortedRequests); // Set filtered requests initially to all requests
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false); // Stop loading after the fetch
            }
        };

        fetchRequests();
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = requests.filter(
            (request) =>
                (request.userId && request.userId.userID.toLowerCase().includes(term)) ||
                (request.userId && request.userId.name.toLowerCase().includes(term))
        );
        setFilteredRequests(filtered);
    };

    // Render a loading state if data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    const updateRequestStatus = async (requestId, requestBy, userId, newStatus) => {
        try {
            const { isConfirmed } = await Swal.fire({
                title: `Are you sure you want to ${newStatus} this request?`,
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: newStatus === "accept" ? "#4CAF50" : "#F44336",
                cancelButtonColor: "#D3D3D3",
                confirmButtonText: `Yes, ${newStatus}!`,
            });

            if (isConfirmed) {
                const payload = {
                    identifiers: [userId], // Array of selected user IDs
                    data: {
                        consultant: requestBy,
                    },
                };
                if (newStatus === 'accept') {
                    const responseConsultant = await axiosPublic.post('/users/assignconsultant', payload);
                    if (responseConsultant.status === 200) {
                        const response = await axiosPublic.patch(`/requests/${requestId}`, { status: newStatus });
                        if (response.status === 200) {
                            Swal.fire("Updated!", `Request has been ${newStatus}ed.`, "success");
                        }
                    }
                } else {
                    const response = await axiosPublic.patch(`/requests/${requestId}`, { status: newStatus });
                    if (response.status === 200) {
                        Swal.fire("Updated!", `Request has been ${newStatus}ed.`, "success");
                    }
                }
            }
        } catch (error) {
            Swal.fire("Error!", "Something went wrong. Please try again.", "error");
        }
    };

    return (
        <div className='p-6'>
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">Manage Requests</h1>
                <h4 className="text-sm text-primary italic">All User Requests By Consultants.</h4>
            </div>

            {/* Search Form */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by User ID or Name"
                    className="input input-bordered w-full max-w-md"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="overflow-x-auto"> {/* Wrap the table with overflow-x-auto for responsiveness */}
                <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">User Name</th>
                            <th className="border px-4 py-2">User Phone</th>
                            <th className="border px-4 py-2">R. ID</th>
                            <th className="border px-4 py-2">R. By</th>
                            <th className="border px-4 py-2">R Whatsapp</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request) => (
                            <tr key={request._id}>
                                <td className="border px-4 py-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{request.userId ? request.userId.userID : "N/A"}</td>
                                <td className="border px-4 py-2">{request.userId ? request.userId.name : 'N/A'}</td>
                                <td className="border px-4 py-2">{request.userId ? request.userId.phone : 'N/A'}</td>
                                <td className="border px-4 py-2">{request.requestBy ? request.requestBy.userID : "N/A"}</td>
                                <td className="border px-4 py-2">{request.requestBy ? request.requestBy.name : "N/A"}</td>
                                <td className="border px-4 py-2">{request.requestBy ? request.requestBy.whatsapp : "N/A"}</td>
                                <td className="border px-4 py-2">
                                    {request.status === "accept" && (
                                        <span className="badge badge-success white">{request.status}ed<FaCheckCircle className="text-white cursor-pointer" title="Accepted Request" /></span>
                                    )}
                                    {request.status === "reject" && (
                                        <span className="badge badge-error">{request.status}ed<FaTimesCircle className="text-red-500 cursor-pointer" title="Reject Request" /></span>
                                    )}
                                    {request.status === "pending" && (
                                        <span className="badge badge-warning">{request.status}</span>
                                    )}
                                </td>
                                <td className="border px-4 py-2 flex justify-between items-center">
                                    {request.status === "pending" && (
                                        <>
                                            <FaCheckCircle
                                                className="text-secondary text-xl cursor-pointer"
                                                onClick={() => updateRequestStatus(request._id, request.requestBy._id, request.userId._id, "accept")}
                                                title="Accept Request"
                                            />
                                            <FaTimesCircle
                                                className="text-red-500 text-xl cursor-pointer"
                                                onClick={() => updateRequestStatus(request._id, "reject")}
                                                title="Reject Request"
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

ControllerRequest.propTypes = {
    // Define prop types here if necessary
};

export default ControllerRequest;
