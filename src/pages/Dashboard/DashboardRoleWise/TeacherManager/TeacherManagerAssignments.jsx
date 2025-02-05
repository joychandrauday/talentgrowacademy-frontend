import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useUser from '../../../Others/Register/useUser';
const TeacherManagerAssignments = () => {
    const axiosPublic = useAxiosPublic();
    const [submittedAssignments, setSubmittedAssignments] = useState([]);
    const { userdb } = useUser()
    useEffect(() => {
        const fetchAllAssignments = async () => {
            try {
                // Fetch all courses
                const response = await axiosPublic.get(`/courses`);
                const courses = response.data.data || [];

                // Extract all submitted assignments from the assignments array of each course
                const allSubmittedAssignments = courses.flatMap(course => course.assignments || []);

                // Sort assignments by date (most recent first)
                allSubmittedAssignments.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Update state with the sorted assignments
                setSubmittedAssignments(allSubmittedAssignments);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAllAssignments();
    }, []);

    console.log(submittedAssignments);
    const handleGradeAssignment = async (assignment) => {
        const { value: status } = await Swal.fire({
            title: 'Grade Assignment',
            html: `
                <label for="status" style="display: block; text-align: left;">Select Status:</label>
                <select id="status" class="swal2-select" style="width: 100%; padding: 0.5rem;">
                    <option value="Pending">Select one</option>
                    <option value="Rejected">Reject</option>
                    <option value="Accepted">Accept</option>
                </select>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const status = document.getElementById('status').value;

                if (!status || status === 'Pending') {
                    Swal.showValidationMessage('Please select a valid status.');
                    return null;
                }

                return status;
            },
        });

        if (status) {
            try {
                // Make the PATCH request to update the assignment status
                const markResponse = await axiosPublic.patch(
                    `/courses/${assignment.courseId}/assignments/${assignment._id}/mark`,
                    { status }
                );

                if (markResponse.data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: `The assignment has been ${status.toLowerCase()} successfully.`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    window.location.reload();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: markResponse.data.message || 'Failed to grade the assignment.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while grading the assignment.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error grading assignment:', error);
            }
        }
    };





    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">Submitted Assignments</h1>
                {submittedAssignments.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-4 text-left">#</th>
                                    <th className="py-2 px-4 text-left">Link</th>
                                    <th className="py-2 px-4 text-left">Submitted By</th>
                                    <th className="py-2 px-4 text-left">User Id</th>
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submittedAssignments.map((assignment, index) => (
                                    <tr key={assignment._id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">
                                            <a
                                                href={assignment.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Link
                                            </a>
                                        </td>
                                        <td className="py-2 px-4">{assignment.submittedBy?.name}</td>
                                        <td className="py-2 px-4">{assignment.submittedBy?.userID}</td>
                                        <td className="py-2 px-4">
                                            {new Date(assignment.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="py-2 px-4">{assignment.status}</td>
                                        <td className="py-2 px-4">
                                            {assignment.status === 'Pending' || assignment.status === 'Resubmitted' ?
                                                <button
                                                    onClick={() => handleGradeAssignment(assignment)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                >
                                                    Feed Back
                                                </button> : <>
                                                    <span className="badge badge-warning">reviewed</span>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    );
};

export default TeacherManagerAssignments;
