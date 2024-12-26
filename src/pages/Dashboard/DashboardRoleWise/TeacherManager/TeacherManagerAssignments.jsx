import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
const TeacherManagerAssignments = () => {
    const axiosPublic = useAxiosPublic();
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

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
        const { value: mark } = await Swal.fire({
            title: 'Grade Assignment',
            input: 'number',
            inputLabel: 'Enter the mark',
            inputPlaceholder: 'Enter a number (e.g., 85)',
            inputAttributes: {
                min: 0,
                max: 100,
                step: 1,
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value || value < 0) {
                    return 'Please enter a valid mark!';
                }
            },
        });

        if (mark) {
            try {
                // Make the PATCH request to update the assignment mark
                const markResponse = await axiosPublic.patch(
                    `/courses/${assignment.courseId}/assignments/${assignment._id}/mark`,
                    { mark: Number(mark) }
                );

                if (markResponse.data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'The assignment has been graded successfully.',
                        icon: 'success',
                        confirmButtonText: 'Next',
                    });

                    // Prompt for bonus amount
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

                    if (bonus) {
                        try {
                            // Post a transaction
                            await axiosPublic.post(`/transactions/create`, {
                                status: 'completed',
                                amount: Number(bonus),
                                type: 'credit',
                                description: 'Bonus for excellent performance in assignment grading.',
                                userId: assignment.submittedBy._id,
                                date: new Date().toISOString(),
                            });

                            Swal.fire({
                                title: 'Bonus Added!',
                                text: 'The bonus has been successfully allocated to the student.',
                                icon: 'success',
                                confirmButtonText: 'OK',
                            });

                            // Optionally refetch data or update UI to reflect the changes

                        } catch (error) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'An error occurred while allocating the bonus.',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                            console.error('Error allocating bonus:', error);
                        }
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
                                    <th className="py-2 px-4 text-left">Mark</th>
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
                                            {assignment.mark !== null ? assignment.mark : 'Not Graded'}
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleGradeAssignment(assignment)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
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
        </div>
    );
};

export default TeacherManagerAssignments;
