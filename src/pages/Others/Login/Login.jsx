import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (localStorage.getItem('authToken')) {
            navigate('/dashboard/');
        }
    }, [navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true); // Set loading to true when starting login

            const identifier = data.email;
            const password = data.password;
            const response = await signInUser(identifier, password);

            if (response.data.success) {
                toast.success('You are logged in successfully!');
                navigate(`/dashboard/${response.data.data.user.role}`);
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (err) {
            console.error("Login Error:", err.message);
            toast.error('Invalid email or password.');
        } finally {
            setLoading(false); // Set loading to false after login attempt
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-gray-200 p-2">
            {/* Background Shapes */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-300 rounded-full opacity-10"></div>
            <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400 opacity-10 clip-polygon"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300 rounded-full opacity-10"></div>
            <div className="absolute bottom-10 left-5 w-28 h-28 bg-yellow-300 rounded-full opacity-20"></div>

            {/* Login Form */}
            <div className="p-8 rounded-lg shadow-lg w-full max-w-lg lg:w-3/4 backdrop-blur-sm border-gray-400 border space-y-8 ">
                <h1 className="text-3xl font-bold text-left mb-6 text-primary">Welcome Back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email or Phone Field */}
                    <div>
                        <input
                            id="email"
                            type="text"
                            {...register('email', { required: 'Email or phone number is required' })}
                            placeholder="Email address or Phone Number"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <span className="loading-sm loading loading-dots"></span> {/* Add a loader spinner */}
                                </div>
                            ) : (
                                'Login'
                            )}
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
