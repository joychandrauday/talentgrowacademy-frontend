import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../../Others/Register/useUser';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const TeacherCourses = () => {
    const { userdb } = useUser();
    const [courses, setCourses] = useState(userdb?.course || []);
    const [updatedLink, setUpdatedLink] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const axiosPublic = useAxiosPublic()

    // Function to handle the class link update
    const handleClassLinkUpdate = async () => {
        if (!updatedLink) {
            Swal.fire('Error', 'Please enter a valid link', 'error');
            return;
        }

        try {
            const response = await axiosPublic.patch(`/courses/${selectedCourseId}`, {
                link: updatedLink,
            });

            if (response.data.success) {
                Swal.fire('Success', 'Class link updated successfully', 'success');
                // Update courses after successful update
                setCourses(courses.map(course => {
                    if (course._id === selectedCourseId) {
                        return { ...course, classLinks: [{ _id: selectedCourseId, link: updatedLink }] };
                    }
                    return course;
                }));
                setUpdatedLink('');
                setSelectedCourseId('');
            }
        } catch (error) {
            console.error("Error updating class link:", error);
            Swal.fire('Error', 'Failed to update class link', 'error');
        }
    };

    useEffect(() => {
        if (userdb?.courses) {
            setCourses(userdb.courses);
        }
    }, [userdb]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Teacher Courses</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses?.map(course => (
                    <div key={course._id} className="border p-4 rounded-lg shadow-sm relative">
                        <img src={course.image} alt={course.name} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-medium mb-2">{course.name}</h2>
                        <p className=" mb-2 absolute badge-warning rounded-full px-3 top-2 right-2 text-white capitalize">{course.category}</p>
                        <div>
                            <strong>Class Links:</strong>
                            {course.classLinks?.length > 0 ? (
                                <ul>
                                    {course.classLinks.map(link => (
                                        <li key={link._id} className="text-blue-500">
                                            <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No class link available</p>
                            )}
                        </div>

                        {/* Form to update class link */}
                        <div className="mt-4">
                            <input
                                type="url"
                                value={selectedCourseId === course._id ? updatedLink : ''}
                                onChange={(e) => setUpdatedLink(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full"
                                placeholder="Enter new class link"
                            />
                            <button
                                onClick={() => {
                                    setSelectedCourseId(course._id);
                                    setUpdatedLink(course.classLinks[0]?.link || ''); // Populate the link if exists
                                }}
                                className="bg-primary text-white px-4 py-2 mt-2 rounded"
                            >
                                Update Link
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit Button to update the class link */}
            {selectedCourseId && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleClassLinkUpdate}
                        className="bg-green-500 text-white px-6 py-3 rounded"
                    >
                        Update Class Link
                    </button>
                </div>
            )}
        </div>
    );
};

TeacherCourses.propTypes = {};

export default TeacherCourses;
