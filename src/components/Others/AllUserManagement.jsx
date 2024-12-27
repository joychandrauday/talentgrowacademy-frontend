/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import useFetchUsers from '../../Hooks/useFetchUsers';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { TbClockCheck } from 'react-icons/tb';
import { GiCaptainHatProfile } from 'react-icons/gi';
import useTrainers from '../../Hooks/roleFetch/useTrainers';
import useGL from '../../Hooks/roleFetch/useGL';
import useSGL from '../../Hooks/roleFetch/useSGL';
import useCard from '../../Hooks/roleFetch/useCard';
import { FaEdit } from 'react-icons/fa';
import { MdBlock, MdReplayCircleFilled } from 'react-icons/md';
import useAdmins from '../../Hooks/roleFetch/useAdmin';

const AllUserManagement = () => {
    const [queryParams, setQueryParams] = useState({
        searchTerm: '',
        role: 'user',
        status: '',
        sort: '-createdAt',
        limit: 10,
        page: 1,  // Start with the first page
        fromDate: '',
        toDate: '',
    });
    const { users, totalPages, currentPage, isLoading, isError, error, refetch } = useFetchUsers(queryParams);
    const axiosPublic = useAxiosPublic();
    const [searchInput, setSearchInput] = useState(queryParams.searchTerm);
    const { admin } = useAdmins()
    const { cards } = useCard();
    const [admissionFees, setAdmissionFees] = useState(0);
    const [allocations, setAllocations] = useState({
        user: 0,
        trainer: 0,
        gl: 0,
        sgl: 0,
        consultant: 0,
        admin: 0, // Initialize admin allocation
    });
    const [alocatedUser, setAllocatedUser] = useState({})
    useEffect(() => {
        const admissionFeesCard = cards.find((card) => card.ID === 'admisssionFeesAdmin');

        if (admissionFeesCard) {
            setAdmissionFees(admissionFeesCard.admissionFees);
            const percentages = {
                reference: 0.24,
                trainer: 0.07,
                gl: 0.09,
                sgl: 0.10,
                consultant: 0.01,
            };

            const roleAllocations = {
                reference: admissionFees * percentages.reference,
                trainer: admissionFees * percentages.trainer,
                groupLeader: admissionFees * percentages.gl,
                seniorGroupLeader: admissionFees * percentages.sgl,
                consultant: admissionFees * percentages.consultant,
            };

            const totalAllocated = Object.values(roleAllocations).reduce((sum, value) => sum + value, 0);
            const adminAllocation = admissionFees - totalAllocated;

            setAllocations({
                ...roleAllocations,
                admin: adminAllocation, // Set admin allocation dynamically
            });
        }
    }, [admissionFees, cards]);

    console.log(allocations, admissionFees);

    // fetch to assign
    const { trainers } = useTrainers()
    const { groupLeaders } = useGL()
    const { seniorGroupLeaders } = useSGL()

    const handleSearch = () => {
        setQueryParams((prev) => ({ ...prev, searchTerm: searchInput }));
        refetch();
    };

    const handlePagination = (page) => {
        if (page >= 1 && page <= totalPages) {
            setQueryParams((prev) => ({
                ...prev,
                page,
            }));
            refetch();
        }
    };

    const handleFilterChange = (e) => {
        setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
    };

    // Function to activate user and assign roles
    const activateUser = async (userID, user) => {
        try {
            // Check if any of the user's roles are missing and reallocate their share to the admin
            const updatedAllocations = { ...allocations };

            // Add admin allocation from hook if any roles are missing
            if (admin) {
                if (!user.reference) updatedAllocations.admin += allocations.reference;
                if (!user.trainer) updatedAllocations.admin += allocations.trainer;
                if (!user.groupLeader) updatedAllocations.admin += allocations.gl;
                if (!user.seniorGroupLeader) updatedAllocations.admin += allocations.sgl;
                if (!user.consultant) updatedAllocations.admin += allocations.consultant;
            }

            // Reset the missing roles' allocations to 0
            if (!user.reference) updatedAllocations.user = 0;
            if (!user.trainer) updatedAllocations.trainer = 0;
            if (!user.groupLeader) updatedAllocations.gl = 0;
            if (!user.seniorGroupLeader) updatedAllocations.sgl = 0;
            if (!user.consultant) updatedAllocations.consultant = 0;


            // Prepare options for dropdowns
            const seniorGroupLeaderOptions = seniorGroupLeaders?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');
            const groupLeaderOptions = groupLeaders?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');
            const trainerOptions = trainers?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');

            // Create the SweetAlert2 dialog with dropdowns
            const { value: formValues } = await Swal.fire({
                title: 'Assign Administrative roles',
                html: `
                    <label for="seniorGroupLeader" style="display: block; text-align: left;">Select Senior Group Leader:</label>
                    <select id="seniorGroupLeader" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Senior Group Leader--</option>
                        ${seniorGroupLeaderOptions}
                    </select>
                    <label for="groupLeader" style="display: block; text-align: left;">Select Group Leader:</label>
                    <select id="groupLeader" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Group Leader--</option>
                        ${groupLeaderOptions}
                    </select>
                    <label for="trainer" style="display: block; text-align: left;">Select Trainer:</label>
                    <select id="trainer" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Trainer--</option>
                        ${trainerOptions}
                    </select>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Activate',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    const seniorGroupLeader = document.getElementById('seniorGroupLeader').value;
                    const groupLeader = document.getElementById('groupLeader').value;
                    const trainer = document.getElementById('trainer').value;

                    if (!seniorGroupLeader || !trainer || !groupLeader) {
                        Swal.showValidationMessage('Please select all required roles.');
                        return null;
                    }

                    return { seniorGroupLeader, groupLeader, trainer };
                },
            });

            if (formValues) {
                const { seniorGroupLeader, groupLeader, trainer } = formValues;

                console.log('Updated Allocations:', updatedAllocations);

                // Perform the update with the selected roles and modified allocations
                await axiosPublic.patch(`/users/${userID}`, {
                    status: 'active',
                    seniorGroupLeader,
                    groupLeader,
                    trainer,
                    activateDate: new Date(),
                });

                // Loop through updatedAllocations and create transactions for amount > 0
                for (let role in updatedAllocations) {
                    const amount = updatedAllocations[role];
                    console.log(role);
                    if (amount > 0) {
                        // Fetch userId of non-null roles and create a transaction
                        let id = user[role];

                        if (role === 'admin') {
                            // Admin transaction creation
                            id = admin;  // Use the admin ID directly from the `admin` object
                        }
                        if (id) {
                            console.log(id);
                            const userId = id._id
                            await axiosPublic.post(`/transactions/create`, {
                                status: 'completed',
                                amount,
                                type: 'credit',
                                description: `${role} Allocation.`,
                                userId,
                                date: new Date().toISOString(),
                            });
                        }
                    }
                }
                // Handle the updated allocations here (you can proceed with creating transactions, etc.)
                console.log("Updated Allocations: ", updatedAllocations);

                // Final confirmation
                Swal.fire('Activated!', 'The user has been activated and assigned.', 'success');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to activate the user.', 'error');
        }
    };
    // handle block user
    const blockUser = async (userID) => {
        try {
            const { value: confirm } = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, block it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });

            if (confirm) {
                await axiosPublic.patch(`/users/${userID}`, {
                    status: 'blocked',
                });

                Swal.fire('Blocked!', 'The user has been blocked.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to block the user.', 'error');
        }
    };
    // handleReassign User
    const handleReassignUser = async (userID) => {
        try {
            // Prepare options for the dropdown
            const seniorGroupLeaderOptions = seniorGroupLeaders?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');
            const groupLeaderOptions = groupLeaders?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');
            const trainerOptions = trainers?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');

            // Create the SweetAlert2 dialog with dropdowns
            const { value: formValues } = await Swal.fire({
                title: 'Re-Assign to Adminstrative users.',
                html: `
                    <label for="seniorGroupLeader" style="display: block; text-align: left;">Select Senior Group Leader:</label>
                    <select id="seniorGroupLeader" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Senior Group Leader--</option>
                        ${seniorGroupLeaderOptions}
                    </select>
                    <label for="seniorGroupLeader" style="display: block; text-align: left;">Select Group Leader:</label>
                    <select id="groupLeader" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Group Leader--</option>
                        ${groupLeaderOptions}
                    </select>
                    <label for="trainer" style="display: block; text-align: left;">Select trainer:</label>
                    <select id="trainer" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Trainer--</option>
                        ${trainerOptions}
                    </select>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Activate',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    const seniorGroupLeader = document.getElementById('seniorGroupLeader').value;
                    const groupLeader = document.getElementById('groupLeader').value;
                    const trainer = document.getElementById('trainer').value;

                    if (!seniorGroupLeader && !trainer && !groupLeader) {
                        Swal.showValidationMessage('Please select at least one of: Senior Group Leader, Trainer, or Group Leader.');
                        return null;
                    }

                    return { seniorGroupLeader, groupLeader, trainer };
                },
            });

            if (formValues) {
                const { seniorGroupLeader, groupLeader, trainer } = formValues;

                const dataToSend = {};

                if (seniorGroupLeader) {
                    dataToSend.seniorGroupLeader = seniorGroupLeader;
                }

                if (groupLeader) {
                    dataToSend.groupLeader = groupLeader;
                }

                if (trainer) {
                    dataToSend.trainer = trainer;
                }

                if (Object.keys(dataToSend).length > 0) {
                    await axiosPublic.patch(`/users/${userID}`, dataToSend);
                    Swal.fire('Updated!', 'The user has been Updated and assigned.', 'success');
                    refetch();
                } else {
                    Swal.showValidationMessage('Please select at least one of: Senior Group Leader, Trainer, or Group Leader.');
                }
                Swal.fire('Updated!', 'The user has been Updated and assigned.', 'success');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to activate the user.', 'error');
            console.log(error);
        }
    }

    // handle edit user
    const editUser = async (userID) => {

    }



    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4 max-w-fit">
            <h1 className="text-xl font-semibold mb-4">User Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search users"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div>
                    <select
                        name="status"
                        value={queryParams.status}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="">Filter by Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        name="fromDate"
                        value={queryParams.fromDate}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="date"
                        name="toDate"
                        value={queryParams.toDate}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
            </div>
            <button
                onClick={handleSearch}
                className="bg-secondary text-white px-8 font-semibold py-2 rounded-full hover:bg-primary mb-4"
            >
                Search
            </button>

            <div className="overflow-x-auto">
                <table className="table-auto  border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Country</th>
                            <th className="border px-4 py-2">refer</th>
                            <th className="border px-4 py-2">Balance</th>
                            <th className="border px-4 py-2">Trainer</th>
                            <th className="border px-4 py-2">G.L</th>
                            <th className="border px-4 py-2">S.G.L</th>
                            <th className="border px-4 py-2">Consultant</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Password</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.userID}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                                <td className="border px-4 py-2">{user.country}</td>
                                <td className="border px-4 py-2">{user.reference ? user.reference.name : 'N/A'}</td>
                                <td className="border px-4 py-2">{user.balance}</td>
                                <td className="border px-4 py-2">{user.trainer?.name}</td>
                                <td className="border px-4 py-2">{user.groupLeader?.name}</td>
                                <td className="border px-4 py-2">{user.seniorGroupLeader?.name}</td>
                                <td className="border px-4 py-2">{user.consultant?.name}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">{user.status}</td>
                                <td className="border px-4 py-2">{user.password}</td>
                                <td className="border px-4 py-2 flex items-center">
                                    {user.status === 'inactive' ? (
                                        <div className="relative group">
                                            <button
                                                onClick={() => activateUser(user?._id, user)}
                                                className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                            >
                                                <TbClockCheck />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <button
                                                className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                            >
                                                <IoCheckmarkCircleSharp />
                                            </button>
                                        </div>
                                    )}
                                    <div className="relative group">
                                        <button
                                            className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                            onClick={() => blockUser(user._id)}
                                        >
                                            <MdBlock />
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <button
                                            className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                            onClick={() => handleReassignUser(user._id)}
                                        >
                                            <MdReplayCircleFilled />
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <button
                                            className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="flex justify-between items-center mt-4">
                <div className="space-x-2">
                    <button
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePagination(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

        </div >
    );
};

export default AllUserManagement;
