import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const location = useLocation();
    const [referCode, setReferCode] = useState('');
    const [countryCode, setCountryCode] = useState('+88');

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (localStorage.getItem('authToken')) {
            navigate('/dashboard/');
        }
    }, [navigate]);

    // Extract the refer code from the URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('refer');
        if (!code) {
            toast('You will register under Admin.', {
                icon: '❗',
            });
        }
        setReferCode(code || '000000');
    }, [location]);

    console.log(referCode);
    const { userSignUp, logOut } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            // Fetch refer user
            const referUser = await axiosPublic.get(`/users/${referCode}`);
            const referData = referUser.data.data;

            const fullName = `${data.firstname} ${data.lastname}`;
            const userData = {
                name: fullName,
                email: data.email,
                password: data.password,
                country: data.country,
                phone: `${countryCode}${data.phone}`,
                language: `${countryCode}${data.whatsapp}`,
                whatsapp: data.whatsapp,
                reference: referData._id,
                seniorGroupLeader: referData.seniorGroupLeader,
                groupLeader: referData.groupLeader,
                trainer: referData.trainer,
            };

            console.log(userData);

            // Send user data to the database
            const response = await axiosPublic.post("/users/register", userData);
            console.log(response);
            if (response.status === 201) {
                toast.success("User registered successfully and added to the database!");

                // Display user credentials in a modal
                Swal.fire({
                    title: "User Registered Successfully!",
                    html:
                        `<div style="text-align: left;">
                            <p><strong>Name:</strong> ${fullName}</p>
                            <p><strong>UserID:</strong> ${response.data.data.userID}</p>
                            <p><strong>Email:</strong> ${userData.email}</p>
                            <p><strong>Password:</strong> ${userData.password}</p>
                            <p><strong>Country:</strong> ${userData.country}</p>
                            <p><strong>Phone:</strong> ${userData.phone}</p>
                            <p><strong>WhatsApp:</strong> ${userData.whatsapp}</p>
                        </div>`,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                logOut(); // Log out the user
                navigate('/login'); // Navigate to login
            } else {
                toast.error("User creation successful, but failed to save to the database.");
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
            toast.error(`Registration failed: ${error.message}`);
        }
    };

    // Function to update country code based on selected country
    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        switch (selectedCountry) {
            case 'Bangladesh':
                setCountryCode('+88');
                break;
            case 'India':
                setCountryCode('+91');
                break;
            case 'Pakistan':
                setCountryCode('+92');
                break;
            case 'Sri Lanka':
                setCountryCode('+94');
                break;
            case 'Nepal':
                setCountryCode('+977');
                break;
            default:
                setCountryCode('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-no-repeat bg-cover pt-32 pb-12">
            <div className="p-8 rounded-lg shadow-lg w-full md:w-2/3 backdrop-blur-sm border-gray-300 border">
                <h1 className="text-3xl font-bold text-left mb-6 text-white">Create an Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name Field */}
                    <div>
                        <input
                            id="firstname"
                            type="text"
                            {...register('firstname', { required: 'First name is required' })}
                            placeholder="First Name"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
                    </div>

                    {/* Last Name Field */}
                    <div>
                        <input
                            id="lastname"
                            type="text"
                            {...register('lastname', { required: 'Last name is required' })}
                            placeholder="Last Name"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email address or Phone Number"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Country Field */}
                    <div>
                        <select
                            id="country"
                            {...register('country', { required: 'Country is required' })}
                            onChange={handleCountryChange}
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                        >

                            <option selected value="Bangladesh">Bangladesh</option>
                            <option value="India">India</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Nepal">Nepal</option>
                        </select>
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <div className="flex items-center">
                            <span className="px-4 py-3 bg-gray-300 text-black rounded-l-lg">{countryCode}</span>
                            <input
                                id="phone"
                                type="tel"
                                {...register('phone', { required: 'Phone number is required' })}
                                placeholder="Phone"
                                className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* WhatsApp Field */}
                    <div>
                        <div className="flex items-center">

                            <span className="px-4 py-3 bg-gray-300 text-black rounded-l-lg">{countryCode}</span>
                            <input
                                id="whatsapp"
                                type="tel"
                                {...register('whatsapp', { required: 'WhatsApp number is required' })}
                                placeholder="WhatsApp"
                                className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Password"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Language Field */}
                    <div>
                        <select
                            id="language"
                            {...register('language', { required: 'Language is required' })}
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.language ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option selected value="">Select Language</option>
                            <option value="English">English</option>
                            <option value="Bangla">Bangla</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>}
                    </div>

                    {/* Reference Field */}
                    <div>
                        <input
                            id="reference"
                            type="text"
                            disabled
                            defaultValue={referCode}
                            {...register('reference')}
                            placeholder="Reference"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.reference ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference.message}</p>}
                    </div>

                    {/* Agree with Terms */}
                    <div className="flex items-center justify-between col-span-1 gap-4">
                        <div className="wrapIn">
                            <input
                                id="agree"
                                type="checkbox"
                                {...register('agree', { required: 'You must agree to the terms and conditions' })}
                            />
                            <label htmlFor="agree" className="ml-2 text-white">I Agree with the <a href="/terms" className="text-blue-400">Terms & Conditions</a></label>
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        Register
                    </button>
                </form>
            </div >
        </div >
    );
};

Register.propTypes = {
    referCode: PropTypes.string,
    countryCode: PropTypes.string,
};

export default Register;
