import React, { useState } from 'react';
import useUser from '../../Others/Register/useUser';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ChangePass = () => {
    const { userdb } = useUser()
    const axiosPublic = useAxiosPublic()
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.retypePassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosPublic.post(`/users/change-password/${userdb.userID}`, {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword
            });
            alert(response.data.message || 'Password updated successfully!');
            setForm({
                currentPassword: '',
                newPassword: '',
                retypePassword: ''
            });
        } catch (error) {
            toast.error('Something went wrong!')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">Manage Your Password</h1>
                <h4 className="text-sm text-primary italic">Change your password easily and efficiently.</h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div className="flex flex-col">
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="p-3 shadow-md shadow-gray-500 border  text-primary rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <input
                        type="text"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="p-3 shadow-md shadow-gray-500 text-primary rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <input
                        type="text"
                        id="retypePassword"
                        name="retypePassword"
                        placeholder="Re-type New Password"
                        value={form.retypePassword}
                        onChange={handleChange}
                        className="p-3 shadow-md shadow-gray-500 text-primary rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-secondary text-white rounded-md font-semibold hover:bg-primary transition"
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default ChangePass;
