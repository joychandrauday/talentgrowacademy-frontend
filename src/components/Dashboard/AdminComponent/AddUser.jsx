import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
const getToken = () => localStorage.getItem('authToken');
const AddUser = () => {
    const token = getToken(); // Retrieve the token

    // Prepare the headers with the token
    const headers = token ? {
        'Authorization': `Bearer ${token}`,
    } : {};

    const { register, handleSubmit, formState: { errors } } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {

        try {

            // Prepare the user data
            const userData = {
                name: data.name,
                email: data.email,
                role: data.role,
                country: data.country,
                phone: data.phone,
                whatsapp: data.whatsapp,
                password: data.password,
                reference: "6759bef8f9a5249d9d87ef87",
                status: 'active',
                isAdminstration: true
            };
            console.log(userData);

            // Add user to the database
            if (userData.role != 'user') {
                const response2 = await axiosPublic.post(`/${userData.role}s/register`, userData, { headers });

                if (response2.status === 201) {
                    Swal.fire({
                        title: "User Registered Successfully!",
                        html: `
                                            <div style="text-align: left;">
                                                <p><strong>Name:</strong> ${userData.name}</p>
                                                <p><strong>Role:</strong> ${userData.role}</p>
                                                <p><strong>UserID:</strong> ${response2.data.data.userID}</p>
                                                <p><strong>Email:</strong> ${userData.email}</p>
                                                <p><strong>Password:</strong> ${userData.password}</p>
                                                <p><strong>Country:</strong> ${userData.country}</p>
                                                <p><strong>Phone:</strong> ${userData.phone}</p>
                                                <p><strong>WhatsApp:</strong> ${userData.whatsapp}</p>
                                            </div>
                                        `,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } else {
                    toast.error("Failed to add user to the database.");
                }
            } else {
                const response = await axiosPublic.post('/users/register', userData);
                if (response.status === 201) {
                    toast.success("User added successfully!");
                } else {
                    toast.error("Failed to add user to the database.");
                }

            }
        } catch (error) {
            console.error("Error adding user:", error.message);
            toast.error(`Adding user failed: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent bg-no-repeat bg-cover">
            <div className="p-8 rounded-lg shadow-lg w-full md:w-2/3 backdrop-blur-sm border-gray-300 border">
                <h1 className="text-3xl font-bold text-left mb-6 text-primary">Add a New User</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name Field */}
                    <div>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'First name is required' })}
                            placeholder="Full Name"
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>



                    {/* Email Field */}
                    <div>
                        <input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email Address"
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Role Field */}
                    <div>
                        <select
                            id="role"
                            {...register('role', { required: 'Role is required' })}
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option selected value="">Select Role</option>
                            <option value="accountant">Accountant</option>
                            <option value="controller">Controller</option>
                            <option value="consultant">Consultant</option>
                            <option value="manager-consultant">Manager(consultant)</option>
                            <option value="sgl">Senoir Group Leader</option>
                            <option value="manager-sgl">Manager(Senior group Leader)</option>
                            <option value="teacher">Teacher</option>
                            <option value="manager-teacher">Manager(Teacher)</option>
                            <option value="group-leader">Group Leader</option>
                            <option value="trainer">Trainer</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                    </div>

                    {/* Country Field */}
                    <div>
                        <select
                            id="country"
                            {...register('country', { required: 'Country is required' })}
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option selected value="">Select Country</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="India">India</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Nepal">Nepal</option>
                        </select>
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone', { required: 'Phone number is required' })}
                            placeholder="Phone"
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
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
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
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
                            className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="w-full">
                        <button
                            type="submit"
                            className={`w-full shadow-md shadow-gray-500 px-4 py-3 mt-1 border rounded-lg bg-secondary text-white font-semibold hover:bg-primary hover:border-none  focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddUser.propTypes = {
    onSubmit: PropTypes.func,
};

export default AddUser;
