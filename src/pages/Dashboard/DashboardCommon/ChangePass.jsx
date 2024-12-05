import React, { useState } from 'react';

const ChangePass = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.newPassword !== form.retypePassword) {
            alert('New passwords do not match!');
            return;
        }
        alert('Password updated successfully!');
        // Add further logic to update the password.
    };

    return (
        <div className="p-6 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">Manage Your Password</h1>
                <h4 className="text-sm text-primary italic">Change your password easily and efficiently.</h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md ">
                <div className="flex flex-col">
                    <label htmlFor="currentPassword" className="text-sm text-gray-400"></label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder='Current Password'
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="p-3 shadow-md shadow-gray-500  border text-white rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col">

                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder='New Password'
                        value={form.newPassword}
                        onChange={handleChange}
                        className="p-3 text-white shadow-md shadow-gray-500  rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="retypePassword" className="text-sm text-gray-400"></label>
                    <input
                        type="password"
                        id="retypePassword"
                        name="retypePassword"
                        placeholder='Re-type New Password'
                        value={form.retypePassword}
                        onChange={handleChange}
                        className="p-3 text-white shadow-md shadow-gray-500  rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-secondary text-white rounded-md font-semibold hover:bg-primary transition"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
}

export default ChangePass;
