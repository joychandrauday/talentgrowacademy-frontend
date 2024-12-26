import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaUserTag, FaCircle, FaUserTie, FaUsers, FaChessQueen, FaChalkboardTeacher, FaLink, FaPhoneAlt, FaWhatsapp, FaCalendarCheck, FaClock, FaAddressCard } from 'react-icons/fa';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { ScrollRestoration } from 'react-router-dom';
import { GiWorld } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import useFetchUsers from '../../Hooks/useFetchUsers';
import useUser from '../../pages/Others/Register/useUser';

const ProfileSearch = () => {
    const { userdb } = useUser();
    // State to manage search term and user details
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null); // To store the found user details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fetch user details by search term (ID, email, or name)
    const handleSearchUser = async () => {
        setLoading(true);
        setError('');
        try {
            // API call to fetch user by search term (modify URL accordingly)
            const response = await axiosPublic.get(`/users/search/${searchTerm}`);
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
                    onClick={handleSearchUser}
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

                    <div className="">
                        {/* User Profile Picture */}
                        <img
                            src={user.avatar || 'https://placehold.co/800@3x.png'}
                            alt="Profile"
                            className="w-24 h-24 mx-auto rounded-full object-cover"
                        />
                        <div className="text-center md:text-left">
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-sm text-gray-600">
                                <strong>Role:</strong> {user.role}
                            </p>
                        </div>
                    </div>


                    {/* Right Column: Rest of the user details */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Details</h3>
                        <div className="space-y-2">

                            <p className="flex gap-2 items-center">
                                <FaCircle className={`mr-2 ${user.status === 'active' ? 'text-green-500' : 'text-red-500 animate-pulse'} `} />
                                <strong>Status:</strong> {user.status}
                            </p>
                            <p className="flex gap-2 items-center">
                                <MdEmail className={`mr-2 ${user.status === 'active' ? 'text-green-500' : 'text-red-500 animate-pulse'} `} />
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaPhoneAlt className="text-green-600 mr-2" />
                                <strong>Phone:</strong> {user.phone}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaAddressCard className="text-green-600 mr-2" />
                                <strong>UserID:</strong> {user.userID}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaWhatsapp className="text-green-500 mr-2" />
                                <strong>WhatsApp:</strong> {user.whatsapp}
                            </p>

                            <p className="flex gap-2 items-center">
                                <GiWorld className="text-green-500 mr-2" />
                                <strong>Country:</strong> {user.country}
                            </p>

                            <p className="flex gap-2 items-center">
                                <FaLink className="text-gray-500 mr-2" />
                                <strong>Reference:</strong> {user.reference?.userID}
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaUsers className="text-yellow-500 mr-2" />
                                <strong>Group Leader:</strong> {user.groupLeader?.name}({user.groupLeader?.userID})
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaChalkboardTeacher className="text-indigo-500 mr-2" />
                                <strong>Trainer:</strong> {user.trainer?.name}({user.trainer?.userID})
                            </p>
                            <p className="flex gap-2 items-center">
                                <FaCalendarCheck className="text-blue-400 mr-2" />
                                <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </p>

                        </div>
                    </div>
                </div>
            )}

            <ScrollRestoration />
        </div>
    );
};

// PropTypes for validation (if needed)
ProfileSearch.propTypes = {
    // Define PropTypes if needed (e.g. for custom props)
};

export default ProfileSearch;
