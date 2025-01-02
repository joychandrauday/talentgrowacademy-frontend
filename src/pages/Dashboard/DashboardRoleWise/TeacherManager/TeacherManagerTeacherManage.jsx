import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTeacher from '../../../../Hooks/roleFetch/useTeacher';
import useCourses from '../../../../Hooks/roleFetch/useCourse';
import { BiRepeat } from 'react-icons/bi';
import { MdBlock } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { BsRepeat } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

const TeacherManagerTeacherManage = () => {
    const { teachers, refetch } = useTeacher(); // Fetching teachers
    const { courses } = useCourses(); // Fetching courses
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const activateUser = async (userID) => {
        try {
            setLoading(true); // Start loading
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

                Swal.fire('Activated!', 'The user has been activated.', 'info');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error!', 'Failed to activate the user.', 'error');
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

    const reAssignTeacher = async (teacherID) => {
        setSelectedTeacher(teacherID);
        setShowModal(true);
    };

    const handleReAssign = async () => {
        try {
            if (!selectedCourse) {
                Swal.fire('Error!', 'Please select a course.', 'error');
                return;
            }

            await axiosPublic.post(`/courses/assign-teachers`, {
                courseId: selectedCourse,
                teacherId: selectedTeacher
            });
            Swal.fire('Reassigned!', 'The teacher has been reassigned to the course.', 'success');
            refetch();
            setShowModal(false);
        } catch (err) {
            Swal.fire('Error!', 'Failed to reassign the teacher.', 'error');
        }
    };

    const filteredTeachers = teachers?.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleRemoveCourse = async (teacherId, courseId) => {
        try {
            const response = await axiosPublic.patch(`/courses/${courseId}/remove-teacher/${teacherId}`);

            if (response.status === 200) {
                Swal.fire('Success', 'Course removed successfully', 'success');
                refetch(); // If using TanStack Query, refetch the data
            }
        } catch (error) {
            console.error('Error removing course:', error);
            Swal.fire('Error', 'Failed to remove course', 'error');
        }
    };

    return (
        <div className="p-6 space-y-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700">Teacher Manager - Teacher Manage</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <input
                    type="text"
                    placeholder="Search teachers..."
                    className="input input-bordered w-full md:w-1/2 bg-white"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers?.map((teacher, index) => (
                            <tr key={teacher.id} className="hover">
                                <td>{index + 1}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    {teacher.status === 'active' ? (
                                        <span className="badge badge-success">{teacher.status}</span>
                                    ) : (
                                        <span className="badge badge-danger">{teacher.status}</span>
                                    )}
                                </td>
                                <td>
                                    {teacher.course ? (
                                        <ol className="list-decimal ml-4"> {/* Use an ordered list */}
                                            {teacher.course.map((c, index) => (
                                                <li key={c._id} className="flex justify-between items-center">
                                                    <span>{`${index + 1}. ${c.name}`}</span> {/* Add list number programmatically */}
                                                    <FaTrash
                                                        onClick={() => handleRemoveCourse(teacher._id, c._id)}
                                                        className="ml-4 text-red-500 hover:text-red-700"
                                                    />
                                                </li>
                                            ))}
                                        </ol>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="flex items-center space-x-3">
                                    {teacher.status === 'active' && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => blockUser(teacher._id)}
                                            >
                                                <MdBlock />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => reAssignTeacher(teacher._id)}
                                            >
                                                <BsRepeat />
                                            </button>
                                        </>
                                    )}
                                    {teacher.status === 'blocked' && (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => activateUser(teacher._id)}
                                        >
                                            <BiRepeat />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredTeachers?.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No teachers found!</p>
            )}

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Reassign Teacher</h3>
                        <select
                            className="select select-bordered w-full mt-4"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="" disabled>
                                Select a course
                            </option>
                            {courses?.map((course) => (
                                <option key={course.id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleReAssign}>
                                Reassign
                            </button>
                            <button className="btn" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
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
