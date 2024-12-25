import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useCourses from '../../../../Hooks/roleFetch/useCourse';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useTeacher from '../../../../Hooks/roleFetch/useTeacher';

const TeacherManagerCourseManagement = () => {
    const { courses } = useCourses(); // Fetching courses
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const { teachers } = useTeacher()
    const openModal = (course) => {
        setSelectedCourse(course);
        reset(course); // Populate form with selected course data
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setShowModal(false);
        reset(); // Clear the form
    };

    const handleSaveChanges = async (data) => {
        // Show confirmation dialog before submitting
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save the changes to this course?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!',
        });

        if (result.isConfirmed) {
            try {
                // Send updated course data to the API
                const response = await axiosPublic.post(`/teacher-managers/edit-class/${data._id}`, data);
                console.log(response);

                if (response.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Course updated successfully.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                    closeModal(); // Close modal after successful submission
                }
            } catch (error) {
                // Handle error response
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while updating the course. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                });
            }
        }
    };

    const handleDelete = (id) => {
        // Add logic to delete the course
        console.log('Deleted Course ID:', id);
    };

    return (
        <div className="p-6 space-y-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700">Teacher Manager - Course Management</h1>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {courses.map((course) => (
                    <div key={course._id} className="card bg-white shadow-md rounded-lg p-4">
                        {/* banner */}
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <h2 className="text-lg font-semibold text-gray-700">{course.name}</h2>
                        <p className="text-sm text-gray-500 mb-4">{course.description}</p>
                        {/* teacher section */}
                        <div className="flex items-center justify-between gap-2">
                            <img src={course.teacherId?.avatar} alt={course.teacher?.name} className="w-12 h-12 rounded-full" />
                            <div className="flex items-start flex-col space-x-2">
                                <h3 className="text-sm font-medium text-gray-600">{course.teacherId?.name}</h3>
                                <p className="text-sm text-gray-500">{course.teacherId?.userID}</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    className="btn"
                                    onClick={() => openModal(course)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleDelete(course.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full md:max-w-xl space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700">Edit Course</h2>
                        <form onSubmit={handleSubmit(handleSaveChanges)} className="space-y-4">
                            <input
                                type="text"
                                {...register('name')}
                                placeholder="Course Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                {...register('image')}
                                placeholder="Image URL"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                {...register('category')}
                                placeholder="Category"
                                className="input input-bordered w-full"
                            />
                            {/* Teacher Dropdown */}
                            <select
                                {...register('teacherId')}
                                className="select select-bordered w-full"
                                defaultValue={selectedCourse?.teacherId || ''}
                            >
                                <option value="" selected className='text-black'>
                                    Select a Teacher
                                </option>
                                {teachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                {...register('description')}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="button" className="btn border-none rounded-full w-full md:w-32 bg-secondary hover:bg-primary text-white" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn border-none rounded-full w-full md:w-32 bg-secondary hover:bg-primary text-white">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

TeacherManagerCourseManagement.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ),
};

export default TeacherManagerCourseManagement;
