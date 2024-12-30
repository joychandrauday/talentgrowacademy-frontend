import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTeacher from '../../../../Hooks/roleFetch/useTeacher';
import useCourses from '../../../../Hooks/roleFetch/useCourse';
import { BiRepeat } from 'react-icons/bi';
import { MdBlock, MdReplayCircleFilled } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';


const TeacherManagerTeacherManage = () => {
    const { teachers, refetch } = useTeacher(); // Fetching teachers
    const { courses } = useCourses(); // Fetching courses
    const axiosPublic = useAxiosPublic()
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    console.log(teachers);


    const handleSearchChange = (e) => setSearchTerm(e.target.value);

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
                await axiosPublic.patch(`/teachers/${userID}/all`, {
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
                await axiosPublic.patch(`/teachers/${userID}/all`, {
                    status: 'blocked',
                });

                Swal.fire('Blocked!', 'The user has been blocked.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to block the user.', 'error');
        }
    };
    return (
        <div className="p-6 space-y-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700">Teacher Manager - Teacher Manage</h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <input
                    type="text"
                    placeholder="Search teachers..."
                    className="input input-bordered w-full md:w-1/2 bg-white"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </div>

            {/* Teacher Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left">#</th>
                            <th className="text-left">Name</th>
                            <th className="text-left">Email</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Role</th>
                            <th className="text-left">Course</th>
                            <th className="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers?.map((teacher, index) => (
                            <tr key={teacher.id} className="hover">
                                <td>{index + 1}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    {
                                        teacher.status === 'active' ? <span className="badge-accnt badge" >{teacher.status}</span> : <span className="bg-red-700 text-white badge ">{teacher.status}</span>
                                    }
                                </td>
                                <td>{teacher.role}</td>
                                <td>{teacher.course?.name || 'N/A'}</td>
                                <td className="border px-4 py-2 flex items-center">
                                    {
                                        <>
                                            {teacher.status === 'active' && (
                                                <button
                                                    className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                    onClick={() => blockUser(teacher._id)}
                                                >
                                                    <MdBlock />
                                                </button>

                                            )
                                            }
                                            {
                                                teacher.status === 'blocked' &&
                                                <button
                                                    className="text-secondary px-3 py-1 rounded flex items-center text-2xl"
                                                    onClick={() => activateUser(teacher._id)}
                                                >
                                                    <BiRepeat />
                                                </button>
                                            }
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {teachers.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No teachers found!</p>
            )}
        </div>
    );
};

TeacherManagerTeacherManage.propTypes = {
    teachers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
        })
    ),
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default TeacherManagerTeacherManage;
