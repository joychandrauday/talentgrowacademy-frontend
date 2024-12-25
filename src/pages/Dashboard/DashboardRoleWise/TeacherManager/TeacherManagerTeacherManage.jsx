import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTeacher from '../../../../Hooks/roleFetch/useTeacher';
import useCourses from '../../../../Hooks/roleFetch/useCourse';


const TeacherManagerTeacherManage = () => {
    const { teachers } = useTeacher(); // Fetching teachers
    const { courses } = useCourses(); // Fetching courses

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    // Filtered teachers based on search and role filter
    const filteredTeachers = teachers.filter((teacher) => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || teacher.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleRoleFilterChange = (e) => setFilterRole(e.target.value);

    const openModal = (teacher) => {
        setSelectedTeacher(teacher);
        console.log(teacher);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedTeacher('');
        setSelectedCourse('');
        setShowModal(false);
    };

    const handleAssignCourse = () => {
        if (selectedCourse) {
            // Add logic to assign the course to the teacher
            console.log(`Assigned course ${selectedCourse} to teacher ${selectedTeacher}`);
            closeModal();
        } else {
            alert('Please select a course!');
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

                <select
                    className="select select-bordered w-full md:w-1/4 bg-white"
                    value={filterRole}
                    onChange={handleRoleFilterChange}
                >
                    <option value="All">All Roles</option>
                    <option value="Subject Teacher">Subject Teacher</option>
                    <option value="Class Teacher">Class Teacher</option>
                </select>
            </div>

            {/* Teacher Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left">#</th>
                            <th className="text-left">Name</th>
                            <th className="text-left">Email</th>
                            <th className="text-left">Role</th>
                            <th className="text-left">Assign Class</th>
                            <th className="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers.map((teacher, index) => (
                            <tr key={teacher.id} className="hover">
                                <td>{index + 1}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.role}</td>
                                <td>
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => openModal(teacher._id)}
                                    >
                                        Assign
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-info btn-sm mr-2">Edit</button>
                                    <button className="btn btn-error btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {filteredTeachers.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No teachers found!</p>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed space-y-0 inset-0 bg-black bg-opacity-50 mt-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Assign Course to {selectedTeacher?.name}
                        </h2>
                        <select
                            className="select select-bordered w-full"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button className="btn btn-error bg-secondary" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="btn btn-success bg-primary" onClick={handleAssignCourse}>
                                Assign
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
