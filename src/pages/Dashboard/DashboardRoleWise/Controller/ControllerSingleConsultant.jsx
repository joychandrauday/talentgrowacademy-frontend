import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useUser from '../../../Others/Register/useUser';
import { Modal } from 'daisyui';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import useFetchUsers from '../../../../Hooks/useFetchUsers';
import useSingleUser from '../../../../Hooks/useSingleUser';
import ControllerAssignModal from '../../../../components/Dashboard/ControllerCOmponent/ControllerAssignModal';

const ControllerSingleConsultant = () => {
    const { userID } = useParams();
    const { singleuser } = useSingleUser(userID);
    console.log(singleuser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inactiveUsers, setInactiveUsers] = useState([]);

    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        role: 'user',
        status: '',
        sort: '-createdAt',
        limit: 10,
        page: 1,
        fromDate: '',
        toDate: '',
    });

    const { users, totalPages, currentPage, isLoading, isError, error, refetch } = useFetchUsers(queryParams);
    useEffect(() => {
        if (singleuser) {
            setQueryParams((prevParams) => ({ ...prevParams, consultant: singleuser._id }));
        }
    }, [singleuser]);
    console.log(users);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        refetch()
    };

    return (
        <div className=" pt-0 space-y-8 relative">
            {/* Profile Section */}
            <section className="bg-gray-800 p-6 m-6 text-white text-center rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold p-6 mb-4">Consultant Profile</h1>
                {singleuser && (
                    <div className="space-y-4 text-center ">
                        <div className="space-x-4 text-center">
                            <div className="w-20 h-20 mx-auto bg-gray-600 rounded-full">
                                {/* Assuming there's a profile picture */}
                                <img src={singleuser.avatar || '/default-avatar.png'} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div>
                                <p><strong>Name:</strong> {singleuser.name}</p>
                                <p><strong>Email:</strong> {singleuser.email}</p>
                                <p><strong>Consultant ID:</strong> {singleuser.userID}</p>
                                <p><strong>Role:</strong> {singleuser.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleModal}
                            className="mt-4 border-none w-full btn bg-secondary"
                        >
                            Assign Some Leads
                        </button>
                    </div>
                )}
            </section>

            {
                //add three card (total users | active users | inactive users)
                users.length > 0 && (
                    <div className="space-y-4 md:space-y-0 p-6 md:flex md:gap-4">
                        <div className="card w-full md:w-1/3 shadow-md bg-primary text-primary-content rounded-lg p-6 flex items-center justify-center">
                            <div>
                                <h3 className="text-lg font-bold text-white">{users.length}</h3>
                                <p className="text-sm text-gray-400">Total Users</p>
                            </div>
                        </div>
                        <div className="card w-full md:w-1/3 shadow-md bg-primary text-primary-content rounded-lg p-6 flex items-center justify-center">
                            <div>
                                <h3 className="text-lg font-bold text-white">{users.filter((user) => user.status === 'active').length}</h3>
                                <p className="text-sm text-gray-400">Active Users</p>
                            </div>
                        </div>
                        <div className="card w-full md:w-1/3 shadow-md bg-primary text-primary-content rounded-lg p-6 flex items-center justify-center">
                            <div>
                                <h3 className="text-lg font-bold text-white">{users.filter((user) => user.status === 'inactive').length}</h3>
                                <p className="text-sm text-gray-400">Inactive Users</p>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* User Table Section */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Active Date</th>
                            <th className="border px-4 py-2">userID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Whatsapp</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">
                                    {
                                        user.status === 'active' ? <>

                                            {new Date(user.updatedAt).toLocaleDateString()}
                                        </> : `${user.status}`
                                    }
                                </td>
                                <td className="border px-4 py-2">{user.userID}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2">{user.whatsapp}</td>
                                <td className="border px-4 py-2">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for inactive users */}
            {isModalOpen && (
                <ControllerAssignModal onClose={toggleModal} user={singleuser} />
            )}
        </div>
    );
};

ControllerSingleConsultant.propTypes = {
    userID: PropTypes.string.isRequired,
};

export default ControllerSingleConsultant;
