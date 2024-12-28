import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import swal from 'sweetalert2';
import useTeacherManager from '../../../../Hooks/roleFetch/useTeacherManager';
import useUser from '../../../Others/Register/useUser';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const MoneyAllocation = () => {
    const { userdb } = useUser()
    const axiosPublic = useAxiosPublic()
    const { teacherManagers, isLoading, isError, error } = useTeacherManager();
    const [selectedTeacherManager, setSelectedTeacherManager] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTeacherManager || !amount) {
            swal.fire('Error', 'Please fill in all fields', 'error');
            return;
        }

        try {
            const adminDeduct = await axiosPublic.post('/transactions/create', {
                userId: userdb._id,
                foreignUser: selectedTeacherManager,
                amount: parseFloat(amount),
                type: 'debit',
                status: 'completed',
                description: 'Money allocated to teacher manager.',
            });
            console.log(adminDeduct);
            const response = await axiosPublic.post('/transactions/create', {
                userId: selectedTeacherManager,
                amount: parseFloat(amount),
                type: 'credit',
                status: 'completed',
                description: 'Money allocated by admin',
            });
            console.log(response);
            if (response.status === 201) {
                swal.fire('Success', 'Money allocated successfully', 'success');
                setSelectedTeacherManager('');
                setAmount('');
            }
        } catch (err) {
            swal.fire('Error', err.response?.data?.message || 'Failed to allocate money', 'error');
            console.log(err);
        }
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-5 min-h-screen w-full">
            <h1 className="text-2xl font-bold text-center mb-5">Money Allocation</h1>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
                <div className="mb-4">
                    <label htmlFor="teacherManager" className="block text-gray-700 font-medium mb-2">
                        Select Teacher Manager
                    </label>
                    <select
                        id="teacherManager"
                        value={selectedTeacherManager}
                        onChange={(e) => setSelectedTeacherManager(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="" disabled>
                            Select a Teacher Manager
                        </option>
                        {teacherManagers.map((manager) => (
                            <option key={manager._id} value={manager._id}>
                                {manager.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter the amount"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                >
                    Allocate Money
                </button>
            </form>
        </div>
    );
};

MoneyAllocation.propTypes = {};

export default MoneyAllocation;
