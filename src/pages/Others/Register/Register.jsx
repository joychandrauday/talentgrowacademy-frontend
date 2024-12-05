import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../Provider/AuthProvider';

const Register = () => {
    const {createUser}=useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email,data.password)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-basic bg-no-repeat bg-cover pt-32 pb-12">
            <div className="p-8 rounded-lg shadow-lg w-full md:w-2/3  backdrop-blur-sm border-gray-300 border">
                <h1 className="text-3xl font-bold text-left mb-6 text-primary">Create an Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2   gap-5">
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
                        <input
                            id="country"
                            type="text"
                            {...register('country', { required: 'Country is required' })}
                            placeholder="Country"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone', { required: 'Phone number is required' })}
                            placeholder="Phone"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* WhatsApp Field */}
                    <div>
                        <input
                            id="whatsapp"
                            type="tel"
                            {...register('whatsapp', { required: 'WhatsApp number is required' })}
                            placeholder="WhatsApp"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
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

                    {/* Reference Field */}
                    <div>
                        <input
                            id="reference"
                            type="text"
                            {...register('reference', { required: 'Reference is required' })}
                            placeholder="Reference"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.reference ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference.message}</p>}
                    </div>

                    {/* Agree with Terms */}
                    <div className="flex items-center justify-between col-span-2 gap-4">
                        <div className="wrapIn">
                            <input
                                id="agree"
                                type="checkbox"
                                {...register('agree', { required: 'You must agree to the terms and conditions' })}
                                className="mr-2"
                            />
                            <label htmlFor="agree" className="text-sm text-gray-700">
                                I agree with the <a href="/terms" className="text-secondary link">terms and conditions</a>
                            </label>
                        </div>
                        {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree.message}</p>}
                        <button
                            type="submit"
                            className="w-1/2 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>

                </form>

                {/* Login Link */}
                <p className="mt-4 text-sm text-center text-gray-500">
                    Already have an account? <a href="/login" className="text-secondary hover:underline">Login</a>
                </p>
            </div >
        </div >
    );
};

Register.propTypes = {
    onSubmit: PropTypes.func,
};

export default Register;
