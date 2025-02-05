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
    const [submittedAssignments, setSubmittedAssignments] = useState([]);
    const [resubmitId, setResubmitId] = useState(null);
    const { userdb } = useUser();
    const userId = userdb._id;

    // Fetch course and submitted assignments
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axiosPublic(`/courses/${id}`);
                const fetchedCourse = response.data.data;
                setCourse(fetchedCourse);

                // Filter user's submitted assignments
                const userAssignments = fetchedCourse.assignments.filter(
                    (assignment) => assignment.submittedBy === userId
                );
                setSubmittedAssignments(userAssignments);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [id, userId]);

    // Handle assignment submission
    const handleAssignmentSubmit = async (e, isResubmit = false, resubmitId = null) => {
        e.preventDefault();

        if (!assignmentLink.trim()) {
            Swal.fire('Error', 'Please provide a valid assignment link.', 'error');
            return;
        }
        const today = new Date().toDateString();
        const alreadySubmitted = submittedAssignments.some(
            (assignment) => new Date(assignment.date).toDateString() === today
        );

        if (alreadySubmitted) {
            Swal.fire('Error', 'You can only submit one assignment per day.', 'error');
            return;
        }
        const newAssignment = {
            date: new Date().toISOString(),
            submittedBy: userId,
            courseId: id,
            mark: null,
            link: assignmentLink,
            status: isResubmit ? 'Resubmitted' : 'Pending',
        };

        try {
            const response = await axiosPublic.patch(`/courses/${id}/assignments`, {
                submittedAssignment: newAssignment,
            });

            if (response.data.success) {
                Swal.fire('Success', `Assignment ${isResubmit ? 'resubmitted' : 'submitted'} successfully!`, 'success');
                setAssignmentLink('');
                setSubmittedAssignments((prev) =>
                    isResubmit
                        ? prev.map((assignment) =>
                            assignment._id === resubmitId ? { ...assignment, ...newAssignment } : assignment
                        )
                        : [...prev, newAssignment]
                );
                window.location.reload()
                setResubmitId(null); // Close the resubmission form
            } else {
                Swal.fire('Error', `Failed to ${isResubmit ? 'resubmit' : 'submit'} the assignment.`, 'error');
            }
        } catch (error) {
            console.error(`Error ${isResubmit ? 'resubmitting' : 'submitting'} assignment:`, error);
            Swal.fire('Error', 'An error occurred while submitting the assignment.', 'error');
        }
    };
    const handleResAssignmentSubmit = async (e, isResubmit = false, resubmitId = null) => {
        e.preventDefault();

        if (!assignmentLink.trim()) {
            Swal.fire('Error', 'Please provide a valid assignment link.', 'error');
            return;
        }
        const today = new Date().toDateString();
        const alreadySubmitted = submittedAssignments.some(
            (assignment) => new Date(assignment.date).toDateString() === today
        );

        if (alreadySubmitted) {
            Swal.fire('Error', 'You can only submit one assignment per day.', 'error');
            return;
        }
        const newAssignment = {
            date: new Date().toISOString(),
            submittedBy: userId,
            courseId: id,
            link: assignmentLink,
            status: isResubmit ? 'Resubmitted' : 'Submitted',
        };

        try {
            const response = await axiosPublic.patch(`/courses/${id}/assignments`, {
                submittedAssignment: newAssignment,
            });

            if (response.data.success) {
                Swal.fire('Success', `Assignment ${isResubmit ? 'resubmitted' : 'submitted'} successfully!`, 'success');
                setAssignmentLink('');
                setSubmittedAssignments((prev) =>
                    isResubmit
                        ? prev.map((assignment) =>
                            assignment._id === resubmitId ? { ...assignment, ...newAssignment } : assignment
                        )
                        : [...prev, newAssignment]
                );
                setResubmitId(null); // Close the resubmission form
            } else {
                Swal.fire('Error', `Failed to ${isResubmit ? 'resubmit' : 'submit'} the assignment.`, 'error');
            }
        } catch (error) {
            console.error(`Error ${isResubmit ? 'resubmitting' : 'submitting'} assignment:`, error);
            Swal.fire('Error', 'An error occurred while submitting the assignment.', 'error');
        }
    };

    return (
        <div className="px-6 pb-6 min-h-screen">
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

            {/* Assignment Submission */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
                <form onSubmit={(e) => handleAssignmentSubmit(e)} className="space-y-4">
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

            {/* Submitted Assignments Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-3">
                <h2 className="text-xl font-bold mb-4">My Submitted Assignments</h2>
                {submittedAssignments.length === 0 ? (
                    <p className="text-gray-600">You have not submitted any assignments yet.</p>
                ) : (
                    <div className="space-y-4">
                        {submittedAssignments.map((assignment, index) => (
                            <div key={index} className="border p-6 rounded-xl shadow-lg bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-800 font-semibold text-lg">
                                        Submitted on: {new Date(assignment.date).toLocaleDateString()}
                                    </p>
                                    <a
                                        href={assignment.link}
                                        className="text-blue-500 hover:text-blue-600 text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Assignment
                                    </a>
                                    <div className={`badge ${assignment.status === 'Rejected' ? 'badge-error' : 'badge-success'}`}>
                                        {assignment.status}
                                    </div>
                                    {assignment.status === 'Rejected' && (
                                        <button
                                            className="btn-sm text-blue-500"
                                            onClick={() => setResubmitId(assignment._id)}
                                        >
                                            Resubmit
                                        </button>
                                    )}
                                </div>

                                {assignment.status === 'Rejected' && resubmitId === assignment._id && (
                                    <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                                        <h3 className="text-xl font-semibold mb-4">Resubmit Assignment</h3>
                                        <form
                                            onSubmit={(e) => handleResAssignmentSubmit(e, true, assignment._id)}
                                            className="space-y-4"
                                        >
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
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetailed;
