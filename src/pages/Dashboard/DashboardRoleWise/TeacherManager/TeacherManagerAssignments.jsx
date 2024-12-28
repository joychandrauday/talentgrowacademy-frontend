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

                if (!status) {
                    Swal.showValidationMessage('Please select a status.');
                    return null;
                }

                return { status };
            },
        });

        if (status) {
            console.log(status);
            try {
                // Make the PATCH request to update the assignment status
                const markResponse = await axiosPublic.patch(
                    `/courses/${assignment.courseId}/assignments/${assignment._id}/mark`, status
                );
                console.log(markResponse);
                if (markResponse.data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'The assignment has been graded successfully.',
                        icon: 'success',
                        confirmButtonText: 'Next',
                    });

                    // If the status is "Accepted", ask for bonus allocation
                    if (markResponse.data.status === 'Accepted') {
                        const { value: bonus } = await Swal.fire({
                            title: 'Allocate Bonus',
                            input: 'number',
                            inputLabel: 'Enter bonus amount',
                            inputPlaceholder: 'Enter a bonus amount (e.g., 500)',
                            inputAttributes: {
                                min: 0,
                                step: 1,
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Submit',
                            cancelButtonText: 'Cancel',
                            inputValidator: (value) => {
                                if (!value || value < 0) {
                                    return 'Please enter a valid bonus amount!';
                                }
                            },
                        });

                        if (bonus && bonus <= userdb?.balance) {
                            try {
                                // Post a transaction
                                await axiosPublic.post(`/transactions/create`, {
                                    status: 'completed',
                                    amount: Number(bonus),
                                    type: 'debit',
                                    description: `Bonus for excellent performance in assignment ${assignment._id}`,
                                    userId: userdb._id,
                                    date: new Date().toISOString(),
                                });
                                // Post a transaction
                                await axiosPublic.post(`/transactions/create`, {
                                    status: 'completed',
                                    amount: Number(bonus),
                                    type: 'credit',
                                    description: `Bonus for excellent performance in assignment ${assignment._id}`,
                                    userId: assignment.submittedBy._id,
                                    date: new Date().toISOString(),
                                });

                                Swal.fire({
                                    title: 'Bonus Added!',
                                    text: 'The bonus has been successfully allocated to the student.',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                });
                            } catch (error) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'An error occurred while allocating the bonus.',
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                });
                                console.error('Error allocating bonus:', error);
                            }
                        } else if (bonus > userdb?.balance) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Insufficient balance for bonus allocation.',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        }
                    } else {
                        // If status is not "Accepted", ask the user to submit the assignment again
                        Swal.fire({
                            title: 'Assignment Submission',
                            text: 'Please submit the assignment again for review.',
                            icon: 'info',
                            confirmButtonText: 'OK',
                        });
                    }
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
                                        <td className="py-2 px-4">
                                            {new Date(assignment.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="py-2 px-4">{assignment.status}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleGradeAssignment(assignment)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                disabled={assignment.status !== 'Pending'}
                                            >
                                                Feed Back
                                            </button>
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
