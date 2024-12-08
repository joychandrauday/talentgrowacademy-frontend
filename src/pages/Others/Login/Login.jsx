import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for database queries.
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Login = () => {
    const navigate = useNavigate();
    const { signInUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email); // Regex to validate email

        try {
            if (isEmail) {
                // firebase log in
                signInUser(data.email, data.password);
                toast.success('You are logged in successfully!');

                // Manual login for email via backend
                const response = await axiosPublic.post("/users/login", {
                    identifier: data.email, // Sending email and password to backend
                    password: data.password,
                });

                console.log(response);
                if (response.data.success) {
                    // Store token in localStorage
                    const token = response.data.data.token;
                    localStorage.setItem('authToken', token);

                    toast.success('You are logged in successfully!');
                    navigate('/dashboard');
                } else {
                    toast.error('Invalid email or password');
                }
            } else {
                // Manual login for phone number
                const response = await axiosPublic.post("/users/login", {
                    identifier: data.email, // Note: Treating 'email' input as phone number
                    password: data.password,
                });

                console.log(response);
                if (response.data.success) {
                    signInUser(response.data.data.user.email, data.password)
                    // Store token in localStorage
                    const token = response.data.data.token;
                    localStorage.setItem('authToken', token);

                    toast.success('You are logged in successfully!');
                    navigate('/dashboard');
                } else {
                    toast.error('Invalid phone number or password');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Login failed. Please try again.');
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-basic bg-no-repeat bg-cover">
            <div className="p-8 rounded-lg shadow-lg w-2/4 backdrop-blur-sm border-gray-300 border space-y-8">
                <h1 className="text-3xl font-bold text-left mb-6 text-primary">Welcome Back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email or Phone Field */}
                    <div>
                        <input
                            id="email"
                            type="text"
                            {...register('email', { required: 'Email or phone number is required' })}
                            placeholder="Email address or Phone Number"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Enter your password"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Forgot Password */}
                <div className="flex items-center justify-start">
                    <a href="/forgot-password" className="text-md hover:underline text-secondary">
                        Forgot Password?
                    </a>
                </div>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Don't have an account? <a href="/register" className="hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

Login.propTypes = {
    onSubmit: PropTypes.func,
};

export default Login;
