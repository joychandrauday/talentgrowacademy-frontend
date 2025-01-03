import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import swal from 'sweetalert2';
import useUser from '../../../Others/Register/useUser';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const TeacherManagerAllocateMoney = () => {
    const { userdb } = useUser();
    const axiosPublic = useAxiosPublic();
    const [userIdToAllocate, setUserIdToAllocate] = useState('');  // To store the userID input by admin
    const [amount, setAmount] = useState('');
    const [user, setUser] = useState(null);  // To store the searched use
    const [loading, setLoading] = useState(false)
    const handleSearchUser = async () => {
        if (!userIdToAllocate) {
            swal.fire('Error', 'Please enter a valid user ID', 'error');
            return;
        }
        try {
            const response = await axiosPublic.get(`/users?searchTerm=${userIdToAllocate}`);
            if (response.status === 200) {
                setUser(response.data.data.users[0]);
                response.data.data.users.length > 0 && toast.success('User found !!')
                response.data.data.users.length < 1 && toast.error('User not found !!')
            }

        } catch (err) {
            swal.fire('Error', 'User not found', 'error');
            setUser(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !amount) {
            swal.fire('Error', 'Please fill in all fields and search for a user first', 'error');
            return;
        }
        if (userdb?.balance < amount || userdb?.balance === 0) {
            Swal.fire('Error', 'Insufficient balance for transaction.', 'error');
            return;
        }
        // Show loading Swal
        Swal.fire({
            title: 'Processing Registration...',
            html: 'Please wait while we process the registration.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        setLoading(true); // Start loading
        // Show loading Swal
        Swal.fire({
            title: 'Processing Registration...',
            html: 'Please wait while we process the registration.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const teacherDeduct = await axiosPublic.post('/transactions/create', {
                userId: userdb._id,
                showingId: userdb.userID,
                foreignUser: user.userID, // Use the selected user
                amount: parseFloat(amount),
                type: 'debit',
                withdraw: true,
                status: 'completed',
                description: 'Money allocated to the user by Teacher.',
            });
            const response = await axiosPublic.post('/transactions/create', {
                userId: user._id,
                showingId: user.userID,
                amount: parseFloat(amount),
                type: 'credit',
                status: 'completed',
                description: 'Money allocated by teacher',
            });
            if (response.status === 201) {
                swal.fire('Success', 'Money allocated successfully', 'success');
                setUserIdToAllocate('');
                setAmount('');
                setUser(null); // Reset user after successful transaction
            }
            setLoading(false)
        } catch (err) {
            swal.fire('Error', err.response?.data?.message || 'Failed to allocate money', 'error');
            setLoading(false)
        }
    };


    return (
        <div className="p-5 min-h-screen w-full">
            <h1 className="text-2xl font-bold text-center mb-5">Money Allocation</h1>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
                {/* User ID Search */}
                <div className="mb-4">
                    <label htmlFor="userIdToAllocate" className="block text-gray-700 font-medium mb-2">
                        Enter User ID to Allocate Money
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="userIdToAllocate"
                            value={userIdToAllocate}
                            onChange={(e) => setUserIdToAllocate(e.target.value)}
                            className="w-full input border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter User ID"
                        /> <label className="flex items-center">

                        </label>
                        <button
                            type="button"
                            onClick={handleSearchUser}
                            className=" bg-indigo-500 text-white btn rounded-md hover:bg-indigo-600 transition"
                        >
                            Search User
                        </button>
                    </div>
                    {/* add a checkbox to select admin or user to search */}



                </div>

                {user && (
                    <div className="mb-4">
                        <p className="font-medium flex items-center gap-2 ">User Found: <span className="card-title">{user.name}</span><span className="badge badge-neutral">{user.role}</span></p>
                        {/* balanec */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">Current Balance: </span>
                            <span className="font-medium text-indigo-600">৳ {user.balance}</span>
                        </div>
                    </div>
                )}

                {/* Amount Input */}
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full input border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter the amount"
                    />
                </div>
                <div className="flex items-center gap-2">

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                    >
                        Allocate Money
                    </button>
                </div>
            </form>

        </div>
    );
};

TeacherManagerAllocateMoney.propTypes = {};

export default TeacherManagerAllocateMoney;
