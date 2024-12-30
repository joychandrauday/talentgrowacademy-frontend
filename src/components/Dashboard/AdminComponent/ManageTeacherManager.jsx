import React, { useState } from "react";
import useTrainers from "../../../Hooks/roleFetch/useTrainers";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { TbClockCheck } from "react-icons/tb";
import { MdBlock, MdReplayCircleFilled } from "react-icons/md";
import { BiRepeat } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import useGL from "../../../Hooks/roleFetch/useGL";
import useSGL from "../../../Hooks/roleFetch/useSGL";
import useSGLManager from "../../../Hooks/roleFetch/useSGLManager";
import useTeacherManager from "../../../Hooks/roleFetch/useTeacherManager";

const ManageTeacherManager = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10; // Number of trainers per page
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const axiosPublic = useAxiosPublic()

    const queryParams = {
        searchTerm: '',
        status: statusFilter,
        page: currentPage,
        limit,
    };

    const { teacherManagers, totalCount, isLoading, isError, refetch } = useTeacherManager(queryParams);
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page
        refetch();
    };

    const handlePageChange = (direction) => {
        const newPage = Math.max(1, currentPage + direction);
        setCurrentPage(newPage);
        refetch();
    };
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
                await axiosPublic.patch(`/teacher-managers/${userId}`, editedUserData);

                Swal.fire('Updated!', 'The user has been updated.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to update the user.', 'error');
        }
        setEditingUserId(null);  // Stop editing
    };

    const activateUser = async (userID) => {
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
                await axiosPublic.patch(`/steacher-managers/${userID}`, {
                    status: 'active',
                });

                Swal.fire('Activated!', 'The user has been Activated.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to block the user.', 'error');
        }
    };
    const blockUser = async (userID) => {
        try {
            const { value: confirm } = await Swal.fire({
                title: 'Are you sure?',
                text: "You will be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, block it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });

            if (confirm) {
                await axiosPublic.patch(`/teacher-managers/${userID}`, {
                    status: 'blocked',
                });

                Swal.fire('Blocked!', 'The user has been blocked.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to block the user.', 'error');
        }
    };

    // const handleAssignUser = async (userID) => {
    //     try {
    //         // Prepare options for the dropdowns
    //         const seniorGroupLeaderManagerOptions = seniorGroupLeaderManagers?.map(leader =>
    //             `<option value="${leader._id}">${leader.name}</option>`
    //         ).join('');

    //         // Create the SweetAlert2 dialog with dropdowns
    //         const { value: formValues } = await Swal.fire({
    //             title: 'Re-Assign to Administrative Users.',
    //             html: `
    //                 <label for="seniorGroupLeaderManager" style="display: block; text-align: left;">Select Senior Group Leader:</label>
    //                 <select id="seniorGroupLeaderManager" class="swal2-select" style="width: 100%; padding: 0.5rem;">
    //                     <option value="">--Select Senior Group Leader Manager--</option>
    //                     ${seniorGroupLeaderManagerOptions}
    //                 </select>

    //             `,
    //             focusConfirm: false,
    //             showCancelButton: true,
    //             confirmButtonText: 'Re-Assign User',
    //             cancelButtonText: 'Cancel',
    //             preConfirm: () => {
    //                 const seniorGroupLeaderManager = document.getElementById('seniorGroupLeaderManager').value;

    //                 // Check if at least one selection is made (SGL, GL, or Trainer)
    //                 if (!seniorGroupLeaderManager) {
    //                     Swal.showValidationMessage('Please select at least one of: Senior Group Leader, Group Leader, or Trainer.');
    //                     return null;
    //                 }

    //                 return { seniorGroupLeaderManager };
    //             },
    //             willOpen: () => {
    //                 // Show a loading spinner before submission
    //                 Swal.showLoading();
    //             }
    //         });

    //         if (formValues) {
    //             const { seniorGroupLeaderManager } = formValues;

    //             const dataToSend = {};

    //             if (seniorGroupLeaderManager) {
    //                 dataToSend.seniorGroupLeaderManager = seniorGroupLeaderManager;
    //             }

    //             if (Object.keys(dataToSend).length > 0) {
    //                 const res = await axiosPublic.patch(`/sgls/${userID}`, dataToSend);
    //                 console.log(res);
    //                 refetch();
    //                 Swal.fire('Updated!', 'The user has been updated and assigned.', 'success');
    //             }
    //         }
    //     } catch (err) {
    //         Swal.fire('Error!', 'Failed to assign the user.', 'error');
    //         console.error(err);
    //     }
    // }



    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center mb-5">groupLeaders</h1>

            {/* Filters */}
            <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-5">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit" className="btn btn-primary">
                    Apply Filters
                </button>
            </form>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>Error loading groupLeaders</p>
                ) : (
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Whatsapp</th>
                                <th>Country</th>
                                <th>Status</th>
                                <th>Balance</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherManagers?.map((user, index) => (
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
                                        <span className={user.status === 'blocked' ? "badge bg-red-800 text-white" : "badge "}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.balance}
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
                                            <>
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleSave(user._id)}
                                                >
                                                    Save
                                                </button>

                                            </>
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
                                                        onClick={() => activateUser(user._id)}
                                                    >
                                                        <BiRepeat />
                                                    </button>
                                                }
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

                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-2">
                    Page {currentPage} of {Math.ceil(totalCount / limit)}
                </span>
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage >= Math.ceil(totalCount / limit)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageTeacherManager;