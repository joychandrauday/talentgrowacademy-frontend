import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import swal from 'sweetalert2';
import useUser from '../../../Others/Register/useUser';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MoneyAllocation = () => {
    const { userdb } = useUser();
    const axiosPublic = useAxiosPublic();
    const [userIdToAllocate, setUserIdToAllocate] = useState('');  // To store the userID input by admin
    const [amount, setAmount] = useState('');
    const [user, setUser] = useState(null);  // To store the searched user data
    const [isAdminSelected, setIsAdminSelected] = useState(true)
    const [loading, setLoading] = useState(false)
    console.log(isAdminSelected);
    const handleSearchUser = async () => {
        if (!userIdToAllocate) {
            swal.fire('Error', 'Please enter a valid user ID', 'error');
            return;
        }
        try {
            const response = await axiosPublic.get(`/${isAdminSelected ? 'admins/alladmins' : 'users'}?searchTerm=${userIdToAllocate}`);
            if (!isAdminSelected) {
                if (response.status === 200) {
                    setUser(response.data.data.users[0]);
                    response.data.data.users.length > 0 && toast.success('User found !!')
                    response.data.data.users.length < 1 && toast.error('User not found !!')
                }
            } else {
                if (response.status === 200) {
                    setUser(response.data.data.results[0]);
                    response.data.data.results.length > 0 && toast.success('User found!!')
                    response.data.data.results.length < 1 && toast.error('User not found!!')
                }
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
            const adminDeduct = await axiosPublic.post('/transactions/create', {
                userId: userdb._id,
                showingId: userdb.userID,
                foreignUser: user._id, // Use the selected user
                amount: parseFloat(amount),
                type: 'debit',
                withdraw: true,
                status: 'completed',
                description: 'Money allocated to the user by admin.',
            });
            const response = await axiosPublic.post('/transactions/create', {
                userId: user._id,
                showingId: user.userID,
                amount: parseFloat(amount),
                type: 'credit',
                status: 'completed',
                description: 'Money allocated by admin',
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
    const handleDeductMoney = async () => {
        if (!user || !amount) {
            Swal.fire('Error', 'Please fill in all fields and search for a user first', 'error');
            return;
        }
        if (amount > Number(user?.balance)) {
            Swal.fire('Error', 'insufficient user balance!!', 'error');
            return;
        }
        const Deduct = await axiosPublic.post('/transactions/create', {
            userId: user._id,
            showingId: user.userID,
            foreignUser: userdb._id, // Use the selected user
            amount: parseFloat(amount),
            type: 'debit',
            withdraw: true,
            status: 'completed',
            description: 'Money deducted by admin.',
        });
        // deducred money added to admin
        const response = await axiosPublic.post('/transactions/create', {
            userId: userdb._id,
            showingId: userdb.userID,
            foreignUser: user.userID,
            amount: parseFloat(amount),
            type: 'credit',
            status: 'completed',
            description: 'Money deducted from user.',
        });
        if (response.status === 201) {
            swal.fire('Success', 'Money deducted successfully', 'success');
            setUserIdToAllocate('');
            setAmount('');
            setUser(null); // Reset user after successful transaction
        }
    }
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
                            <input
                                type="checkbox"
                                checked={!isAdminSelected}
                                onChange={() => setIsAdminSelected(!isAdminSelected)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-700">User</span>
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
            <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
                <button
                    onClick={handleDeductMoney}
                    className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                >
                    Deduct Money
                </button>
            </div>
        </div>
    );
};

MoneyAllocation.propTypes = {};

export default MoneyAllocation;
