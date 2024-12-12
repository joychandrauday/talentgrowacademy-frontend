import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // You can use axios or your custom fetch function for API requests
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaUserTag, FaCircle, FaUserTie, FaUsers, FaChessQueen, FaChalkboardTeacher, FaLink, FaPhoneAlt, FaWhatsapp, FaCalendarCheck, FaClock } from 'react-icons/fa';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ProfileSearch = () => {
    // State to manage search term and user details
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null); // To store the found user details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic()

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fetch user details by search term (ID, email, or name)
    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            // API call to fetch user by search term (modify URL accordingly)
            const response = await axiosPublic.get(`/users/${searchTerm}`);
            console.log(response);
            setUser(response.data?.data); // Assuming response contains user data
        } catch (err) {
            setError('User not found or error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {/* Search Field */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by user ID, email, or name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border p-2 rounded-lg w-64 shadow-md shadow-gray-400 px-4 "
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-secondary drop-shadow-lg text-white rounded-lg hover:bg-primary transition duration-300"
                >
                    Search
                </button>
            </div>

            {/* Loading, Error, or User Profile Display */}
            {loading && <LoadingSpinner />}
            {error && <div className="text-red-500">{error}</div>}
            {user && !loading && !error && (
                <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Avatar, Name, Email, and Balance */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        {/* User Profile Picture */}
                        <img
                            src={user.avatar || 'https://placehold.co/800@3x.png'} // Add default avatar if no profile picture
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className="text-lg text-gray-600">{user.email}</p>
                            <p className="text-lg text-gray-600"><strong>Balance:</strong> ${user.balance}</p>
                        </div>
                    </div>

                    {/* Right Column: Rest of the user details */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Details</h3>
                        <div className="space-y-2">
                            <p className="flex gap-2 items-center">
                                <FaUserTag className="text-blue-500 mr-2" />
                                <strong>Role:</strong> {user.role}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaCircle className={`mr-2 ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`} />
                                <strong>Status:</strong> {user.status}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaUserTie className="text-purple-500 mr-2" />
                                <strong>Consultant:</strong> {user.consultant}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaUsers className="text-yellow-500 mr-2" />
                                <strong>Group Leader:</strong> {user.groupLeader}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaChessQueen className="text-pink-500 mr-2" />
                                <strong>Senior Group Leader:</strong> {user.seniorGroupLeader}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaChalkboardTeacher className="text-indigo-500 mr-2" />
                                <strong>Trainer:</strong> {user.trainer}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaLink className="text-gray-500 mr-2" />
                                <strong>Reference:</strong> {user.referrence}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaPhoneAlt className="text-green-600 mr-2" />
                                <strong>Phone:</strong> {user.phone}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaWhatsapp className="text-green-500 mr-2" />
                                <strong>WhatsApp:</strong> {user.whatsapp}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaCalendarCheck className="text-blue-400 mr-2" />
                                <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaClock className="text-gray-400 mr-2" />
                                <strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// PropTypes for validation (if needed)
ProfileSearch.propTypes = {
    // Define PropTypes if needed (e.g. for custom props)
};

export default ProfileSearch;
