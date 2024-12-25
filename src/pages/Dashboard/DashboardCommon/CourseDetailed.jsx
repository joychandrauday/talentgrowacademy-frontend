import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useUser from '../../Others/Register/useUser';

const CourseDetailed = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [course, setCourse] = useState({});
    const [assignmentLink, setAssignmentLink] = useState('');
    const { userdb } = useUser()
    const userId = userdb._id;

    // Fetch the course information from the server by _id
    useEffect(() => {
        const fetchCourse = async (courseId) => {
            try {
                const response = await axiosPublic(`/courses/${courseId}`);
                setCourse(response.data.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse(id);
    }, [id]);

    // Handle assignment submission
    const handleAssignmentSubmit = async (e) => {
        e.preventDefault();

        if (!assignmentLink.trim()) {
            Swal.fire('Error', 'Please provide a valid assignment link.', 'error');
            return;
        }

        const newAssignment = {
            date: new Date().toISOString(),
            submittedBy: userId, // Replace with dynamic user ID or name
            status: 'Pending',
            mark: null,
            link: assignmentLink,
        };

        try {
            const response = await axiosPublic.patch(`/courses/${id}/assignments`, {
                submittedAssignment: newAssignment,
            });

            if (response.data.success) {
                Swal.fire('Success', 'Assignment submitted successfully!', 'success');
                setAssignmentLink('');
                setCourse((prev) => ({
                    ...prev,
                    submittedAssignment: [...(prev.submittedAssignment || []), newAssignment],
                }));
            } else {
                Swal.fire('Error', 'Failed to submit the assignment.', 'error');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
            Swal.fire('Error', 'An error occurred while submitting the assignment.', 'error');
        }
    };
    console.log(course);
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Course Details */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <img
                    src={course.image || '/default-cover-image.png'}
                    alt="Course Cover"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h1 className="text-2xl font-bold mb-4">{course.name || 'Course Title'}</h1>
                <p className="text-gray-600 mb-4">{course.description || 'Course Description'}</p>

            </div>

            {
                course.allAssignment ?
                    <>

                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h1 className="text-2xl font-bold mb-4">asignment name: {course.allAssignment[0].title || 'Course Title'}</h1>
                            <p className="text-gray-600 mb-4">Total Marks: {course.allAssignment[0].totalMark || 'Course Title'}</p>
                            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
                            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="assignmentLink" className="block text-gray-700">
                                        Assignment Link
                                    </label>
                                    <input
                                        type="url"
                                        id="assignmentLink"
                                        value={assignmentLink}
                                        onChange={(e) => setAssignmentLink(e.target.value)}
                                        placeholder="Enter your assignment link"
                                        className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                                >
                                    Submit Assignment
                                </button>
                            </form>
                        </div>
                    </> : "no assignment to submit"
            }
            {/* My Submission */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-xl font-bold mb-4">My Submission</h2>
                {course.submittedAssignment &&
                    course.submittedAssignment.filter((assignment) => assignment.submittedBy === userId).length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Mark</th>
                                <th className="border px-4 py-2">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {course.submittedAssignment
                                .filter((assignment) => assignment.submittedBy === userId)
                                .map((assignment, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">
                                            {new Date(assignment.date).toLocaleDateString()}
                                        </td>
                                        <td className="border px-4 py-2">{assignment.status}</td>
                                        <td className="border px-4 py-2">{assignment.mark || 'N/A'}</td>
                                        <td className="border px-4 py-2">
                                            <a
                                                href={assignment.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">You have not submitted any assignments yet.</p>
                )}
            </div>
        </div>
    );
};

export default CourseDetailed;
