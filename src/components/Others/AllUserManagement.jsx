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
import { BiRepeat } from 'react-icons/bi';
import useConsultant from '../../Hooks/roleFetch/useConsultant';

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
                sgl: 0.01,
                consultant: 0.10,
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


    // fetch to assign
    const { trainers } = useTrainers()
    const { groupLeaders } = useGL()
    const { seniorGroupLeaders } = useSGL()
    const { consultants } = useConsultant()

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

    const activateUser = async (userID, user) => {
        try {
            const updatedAllocations = { ...allocations }; // Clone initial allocations

            // Check for null or unassigned roles and reallocate their share to admin
            let isAnyRoleAssigned = false; // Track if at least one role is assigned

            // Iterate over each role to check assignments and adjust allocations
            for (const [role, allocation] of Object.entries(updatedAllocations)) {
                if (role !== 'admin') { // Skip admin allocation check here
                    if (!user[role]) {
                        // If role is unassigned, add its allocation to admin
                        updatedAllocations.admin += allocation;
                        updatedAllocations[role] = 0; // Set unassigned role allocation to 0
                    } else {
                        isAnyRoleAssigned = true; // Mark that at least one role is assigned
                    }
                }
            }

            // If all roles are unassigned, allocate the entire admission fee to admin
            if (!isAnyRoleAssigned) {
                updatedAllocations.admin = admissionFees;
                Object.keys(updatedAllocations).forEach((key) => {
                    if (key !== 'admin') updatedAllocations[key] = 0; // Reset all other roles
                });
            }

            // Confirmation dialog for role assignments
            const swalInstance = await Swal.fire({
                title: 'Confirm Activating.',
                html: `Do you want to activate this user ?`,
                showCancelButton: true,
                confirmButtonText: 'Activate',
                cancelButtonText: 'Cancel',
            });

            if (swalInstance.isConfirmed) {
                const loaderInstance = Swal.fire({
                    title: 'Processing...',
                    html: 'Creating transactions, please wait...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading(); // Trigger SweetAlert2 loading spinner
                    },
                });
                // Activate user and assign roles
                await axiosPublic.patch(`/users/${userID}`, {
                    status: 'active',
                    activateDate: new Date(),
                });

                // Process transactions for each role with allocation > 0
                for (const [role, amount] of Object.entries(updatedAllocations)) {
                    if (amount > 0) {
                        const id = role === 'admin' ? admin?._id : user[role]?._id;

                        if (id) {
                            await axiosPublic.post(`/transactions/create`, {
                                status: 'completed',
                                amount,
                                type: 'credit',
                                description: `${role} Allocation`,
                                userId: id,
                                foreignUser: user.userID,
                                date: new Date().toISOString(),
                            });
                        }
                    }
                }
                // Activate bonus for the user
                await axiosPublic.post(`/transactions/create`, {
                    status: 'completed',
                    amount: 50,
                    type: 'credit',
                    description: `activation bonus.`,
                    userId: userID,
                    foreignUser: admin.userID,
                    date: new Date().toISOString(),
                });

                // Debit the admin for the bonus
                await axiosPublic.post(`/transactions/create`, {
                    status: 'completed',
                    amount: 50,
                    withdra: true,
                    type: 'debit',
                    description: `activation bonus.`,
                    userId: admin._id,
                    foreignUser: user.userID,
                    date: new Date().toISOString(),
                });

                const dataToSend = {
                    trainer: null,
                    groupLeader: null,
                    seniorGroupLeader: null,
                }

                await axiosPublic.patch(`/users/${userID}`, dataToSend);
                Swal.fire('Success', 'User has been activated . Reassign the User.', 'success');
                refetch(); // Refresh data after activation
            }
        } catch (error) {
            console.error('Activation Error:', error);
            Swal.fire('Error', 'Failed to activate the user.', 'error');
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
            const consultantOptions = consultants?.map(leader =>
                `<option value="${leader._id}">${leader.name}</option>`).join('');
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
                    <label for="consultant" style="display: block; text-align: left;">Select Senior Group Leader:</label>
                    <select id="consultant" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                        <option value="">--Select Consultant--</option>
                        ${consultantOptions}
                    </select>
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
                confirmButtonText: 'Re-Assign User',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    const consultant = document.getElementById('consultant').value;
                    const seniorGroupLeader = document.getElementById('seniorGroupLeader').value;
                    const groupLeader = document.getElementById('groupLeader').value;
                    const trainer = document.getElementById('trainer').value;

                    if (!seniorGroupLeader && !trainer && !groupLeader && !consultant) {
                        Swal.showValidationMessage('Please select at least one of: Senior Group Leader, Trainer, or Group Leader.');
                        return null;
                    }

                    return { seniorGroupLeader, groupLeader, trainer, consultant };
                },
                willOpen: () => {
                    // Show a loading spinner before submission
                    Swal.showLoading();
                }
            });

            if (formValues) {
                const { seniorGroupLeader, groupLeader, trainer, consultant } = formValues;

                const dataToSend = {};

                if (consultant) {
                    dataToSend.consultant = consultant;
                }
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
        }
    }


    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});

    const handleInputChange = (e, field) => {
        setEditedUserData({
            ...editedUserData,
            [field]: e.target.value,
        });
    };

    const handleSave = async (userId) => {
        try {
            const { value: confirm } = await Swal.fire({
                title: 'Are you sure?',
                text: "You will be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Update it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });

            if (confirm) {
                await axiosPublic.patch(`/users/${userId}`, editedUserData);

                Swal.fire('Updated!', 'The user has been updated.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to block the user.', 'error');
        }
        setEditingUserId(null);  // Stop editing
    };

    const reactiveUser = async (userID) => {
        try {
            const { value: confirm } = await Swal.fire({
                title: 'Are you sure?',
                text: "You will be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, unblock it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });
            if (confirm) {
                await axiosPublic.patch(`/users/${userID}`, {
                    status: 'active',
                });

                Swal.fire('UnBlocked!', 'The user has been Unblocked.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to Unblock the user.', 'error');
        }
    };
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
                <table className="table-auto min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Whatsapp</th>
                            <th className="border px-4 py-2">Country</th>
                            <th className="border px-4 py-2">Refer</th>
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
                                <td className="border px-4 py-2">
                                    {user.userID}
                                </td>
                                <td className="border px-4 py-2">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.name || user.name}
                                            onChange={(e) => handleInputChange(e, "name")}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="email"
                                            value={editedUserData.email || user.email}
                                            onChange={(e) => handleInputChange(e, "email")}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.phone || user.phone}
                                            onChange={(e) => handleInputChange(e, "phone")}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        user.phone
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.whatsapp || user.whatsapp}
                                            onChange={(e) => handleInputChange(e, "whatsapp")}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        user.whatsapp
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.country || user.country}
                                            onChange={(e) => handleInputChange(e, "country")}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        user.country
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.reference ? user.reference.name : 'N/A'}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.balance}
                                </td>
                                {/* Add other fields similarly */}
                                <td className="border px-4 py-2">{user.trainer?.name}</td>
                                <td className="border px-4 py-2">{user.groupLeader?.name}</td>
                                <td className="border px-4 py-2">{user.seniorGroupLeader?.name}</td>
                                <td className="border px-4 py-2">{user.consultant?.name}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">
                                    <span className={user.status === 'blocked' ? "badge bg-red-800 text-white" : "badge "}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.password || user.password || "N/A"}
                                            onChange={(e) => handleInputChange(e, "password")}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        user.password
                                    )}

                                </td>
                                <td className="border px-4 py-2 flex items-center">
                                    {editingUserId === user._id ? (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleSave(user._id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            {user.status === 'inactive' && (
                                                <button
                                                    onClick={() => activateUser(user._id, user)}
                                                    className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                >
                                                    <TbClockCheck />
                                                </button>
                                            )
                                            }
                                            {user.status === 'active' && (
                                                <button
                                                    className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                    onClick={() => blockUser(user._id)}
                                                >
                                                    <MdBlock />
                                                </button>

                                            )
                                            }
                                            {
                                                user.status === 'blocked' &&
                                                <button
                                                    className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                    onClick={() => reactiveUser(user._id)}
                                                >
                                                    <BiRepeat />
                                                </button>
                                            }
                                            <button
                                                className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                onClick={() => handleReassignUser(user._id)} disabled={user.status === 'inactive' || user.status === 'blocked'}
                                            >
                                                <MdReplayCircleFilled />
                                            </button>
                                            <button
                                                className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                onClick={() => setEditingUserId(user._id)} // Start editing
                                            >
                                                <FaEdit />
                                            </button>
                                        </>
                                    )}
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