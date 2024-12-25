import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useCourses from '../../../../Hooks/roleFetch/useCourse';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TeacherManagerAssignments = () => {
    const axiosPublic = useAxiosPublic();
    const [assignments, setAssignments] = useState({});
    const { courses } = useCourses();
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [submittedAssignment, setNewAssignment] = useState({
        title: '',
        totalMark: '',
        date: '',
    });
    console.log(selectedClass);
    // Fetch assignments and students for a selected class
    useEffect(() => {
        if (selectedClass) {
            // Fetch assignments for the selected class
            const fetchAssignments = async () => {
                try {
                    const response = await axiosPublic.get(`/courses/${selectedClass}`);
                    console.log(response);
                    setAssignments(response.data.data.allAssignment);
                } catch (error) {
                    console.error('Error fetching assignments:', error);
                }
            };


            fetchAssignments();
        }
    }, [selectedClass]);

    // Handle new assignment creation
    const handleNewAssignmentSubmit = async (e) => {
        e.preventDefault();

        if (!submittedAssignment.title || !submittedAssignment.totalMark || !submittedAssignment.date) {
            Swal.fire('Error', 'Please fill in all fields.', 'error');
            return;
        }

        try {
            const response = await axiosPublic.patch(`/courses/assignments/${selectedClass}/add`, {
                submittedAssignment
            });
            if (response.data.success) {
                Swal.fire('Success', 'Assignment created successfully!', 'success');
            } else {
                Swal.fire('Error', 'Failed to create assignment.', 'error');
            }
        } catch (error) {
            console.error('Error creating assignment:', error);
            Swal.fire('Error', 'An error occurred.', 'error');
        }
    };

    // Handle marking assignment with rewards
    const handleMarkAssignment = async (assignmentId, studentId, mark, reward) => {
        try {
            const response = await axiosPublic.patch(`/courses/assignments/${assignmentId}/mark`, {
                studentId,
                mark,
                reward,
            });
            if (response.data.success) {
                Swal.fire('Success', 'Assignment marked and reward granted!', 'success');
            } else {
                Swal.fire('Error', 'Failed to mark assignment.', 'error');
            }
        } catch (error) {
            console.error('Error marking assignment:', error);
            Swal.fire('Error', 'An error occurred while marking.', 'error');
        }
    };
    // handle block assignment
    const handleUpdateAssignment = async () => {
        const submittedAssignment = {
        }
        try {
            const response = await axiosPublic.patch(`/courses/assignments/${selectedClass}/add`, {
                submittedAssignment
            });
            if (response.data.success) {
                Swal.fire('Success', 'Assignment blocked!', 'success');
            } else {
                Swal.fire('Error', 'Failed to block assignment.', 'error');
            }
        } catch (error) {
            console.error('Error blocking assignment:', error);
            Swal.fire('Error', 'An error occurred while blocking.', 'error');
        }
    };
    console.log(assignments);
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Tabs>
                <TabList className="flex space-x-4 mb-6">
                    <Tab className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white transition">Add Assignment</Tab>
                    <Tab className="py-2 px-4 cursor-pointer hover:bg-blue-500 hover:text-white transition">Manage Assignments</Tab>
                </TabList>

                <TabPanel>
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h1 className="text-2xl font-bold mb-4">Add New Assignment</h1>
                        <form onSubmit={handleNewAssignmentSubmit} className="space-y-4">
                            <div className="mb-4">
                                <label htmlFor="classSelect" className="block text-gray-700 mb-2">Select Class</label>
                                <select
                                    id="classSelect"
                                    className="w-full p-2 border rounded-lg"
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                >
                                    <option value="">Select a Couruse</option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.name}
                                        </option>
                                    ))}
                                    {/* Add more class options dynamically if needed */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={submittedAssignment.title}
                                    onChange={(e) => setNewAssignment({ ...submittedAssignment, title: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Enter assignment title"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block text-gray-700">Deadline</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={submittedAssignment.date}
                                    onChange={(e) => setNewAssignment({ ...submittedAssignment, date: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="total Mark" className="block text-gray-700">Total Mark</label>
                                <input
                                    type="number"
                                    id="totalMark"
                                    value={submittedAssignment.totalMark}
                                    onChange={(e) => setNewAssignment({ ...submittedAssignment, totalMark: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Create Assignment
                            </button>
                        </form>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Manage Assignments</h2>
                        <div className="mb-4">
                            <label htmlFor="classSelect" className="block text-gray-700 mb-2">Select Class</label>
                            <select
                                id="classSelect"
                                className="w-full p-2 border rounded-lg"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select a Couruse</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.name}
                                    </option>
                                ))}
                                {/* Add more class options dynamically if needed */}
                            </select>
                        </div>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Title</th>
                                    <th className="border px-4 py-2">Description</th>
                                    <th className="border px-4 py-2">Deadline</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assignments && <>
                                        <tr>
                                            <td className="border px-4 py-2">{assignments.title}</td>
                                            <td className="border px-4 py-2">{assignments.status}</td>
                                            <td className="border px-4 py-2">{new Date(assignments.date).toLocaleDateString()}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                                    onClick={() => handleUpdateAssignment()}
                                                >
                                                    Update Assignment
                                                </button>
                                            </td>
                                        </tr>

                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Marking Assignments */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Mark Student Assignments</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Student Name</th>
                                    <th className="border px-4 py-2">Mark</th>
                                    <th className="border px-4 py-2">Reward</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student._id}>
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                className="w-full p-2 border rounded-lg"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                placeholder="Enter reward"
                                                className="w-full p-2 border rounded-lg"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                                onClick={() => handleMarkAssignment(assignment._id, student._id, mark, reward)}
                                            >
                                                Submit Mark
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div >
    );
};

TeacherManagerAssignments.propTypes = {
    // Add prop types if needed
};

export default TeacherManagerAssignments;
