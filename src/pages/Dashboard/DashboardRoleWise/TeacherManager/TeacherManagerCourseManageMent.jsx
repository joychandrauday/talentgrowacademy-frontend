import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useCourses from '../../../../Hooks/roleFetch/useCourse';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useTeacher from '../../../../Hooks/roleFetch/useTeacher';

const TeacherManagerCourseManagement = () => {
    const { courses, refetch } = useCourses(); // Fetching courses with refetch functionality
    const { teachers } = useTeacher(); // Fetching teachers
    const axiosPublic = useAxiosPublic();
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState(''); // 'edit' or 'add'
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const openModal = (mode, course = null) => {
        setModalMode(mode);
        setSelectedCourse(course);
        reset(course || {}); // Reset form with course data for editing or empty for adding
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
        reset();
    };

    const handleSaveChanges = async (datam) => {
        const confirmationText =
            modalMode === 'edit' ? 'save the changes to this course?' : 'add this new course?';

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to ${confirmationText}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!',
        });

        if (result.isConfirmed) {
            try {
                if (modalMode === 'edit') {
                    // Update existing course
                    const res2 = await axiosPublic.patch(`/courses/update-course/${datam._id}`, datam);
                    const res3 = await axiosPublic.patch(`/teachers/${datam.teacherId}`, {
                        data: datam._id
                    });

                    if (res2.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Course updated successfully',
                            icon: 'success',
                        });
                    }
                } else {
                    // Add new course
                    const res2 = await axiosPublic.post('/courses/', datam);
                    const res3 = await axiosPublic.patch(`/teachers/${datam.teacherId}`, {
                        data: res2.data.data._id
                    });
                    if (res2.status === 201) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Course added successfully.',
                            icon: 'success',
                        });
                    }
                }

                refetch(); // Refresh courses data
                closeModal(); // Close the modal after success
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || `An error occurred while ${modalMode === 'edit' ? 'updating' : 'adding'} the course. Please try again.`,
                    icon: 'error',
                });
            }
        }
    };


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this course?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosPublic.delete(`/courses/${id}`);
                console.log(res);
                if (res.data.success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Course deleted successfully.',
                        icon: 'success',
                    });
                }
                refetch(); // Refresh courses data
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the course. Please try again.',
                    icon: 'error',
                });
                console.log(error);
            }
        }
    };

    return (
        <div className="p-6 space-y-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700">Teacher Manager - Course Management</h1>

            {/* Add Course Button */}
            <button
                className="btn bg-primary text-white"
                onClick={() => openModal('add')}
            >
                Add New Course
            </button>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {courses.map((course) => (
                    <div key={course._id} className="card bg-white shadow-md rounded-lg p-4">
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <h2 className="text-lg font-semibold text-gray-700">{course.name}</h2>
                        <p className="text-sm text-gray-500 mb-4">{course.description}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="btn"
                                onClick={() => openModal('edit', course)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleDelete(course._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full md:max-w-xl space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            {modalMode === 'edit' ? 'Edit Course' : 'Add New Course'}
                        </h2>
                        <form onSubmit={handleSubmit(handleSaveChanges)} className="space-y-4">
                            <input
                                type="text"
                                {...register('name')}
                                placeholder="Course Name"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                {...register('image')}
                                placeholder="Image URL"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                {...register('category')}
                                placeholder="Category"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                {...register('classLink')}
                                placeholder="Class Link"
                                className="input input-bordered w-full"
                                required
                            />
                            <select
                                {...register('teacherId')}
                                className="select select-bordered w-full"
                                required
                                defaultValue={selectedCourse?.teacherId || ''}
                            >
                                <option value="" disabled>
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
                                required
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="btn border-none bg-gray-400 text-white"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-primary text-white"
                                >
                                    {modalMode === 'edit' ? 'Save Changes' : 'Add Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherManagerCourseManagement;
