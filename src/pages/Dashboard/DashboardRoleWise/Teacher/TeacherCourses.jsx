import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../../Others/Register/useUser';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useCourses from '../../../../Hooks/roleFetch/useCourse';
import { DiVim } from 'react-icons/di';

const TeacherCourses = () => {
    const { userdb } = useUser();
    const [updatedLink, setUpdatedLink] = useState(''); // State for updated class link
    const [selectedCourseId, setSelectedCourseId] = useState(null); // State for selected course
    const axiosPublic = useAxiosPublic();
    console.log(userdb.course);
    // Handle updating the class link for a selected course
    const handleClassLinkUpdate = async () => {
        if (!updatedLink) {
            Swal.fire('Error', 'Please enter a valid link', 'error');
            return;
        }
        try {
            const response = await axiosPublic.patch(`/courses/${userdb.course?._id}/update-class-link`, {
                classLink: updatedLink, // Ensure the key matches the backend expectation
            });

            if (response.status === 200) {
                Swal.fire('Success', 'Class link updated successfully', 'success');
            }
        } catch (error) {
            console.error("Error updating class link:", error);
            Swal.fire('Error', 'Failed to update class link', 'error');
        }
    };
    const handleLiveStatusToggle = async (id) => {
        try {
            const newStatus = !userdb.course?.isLive; // Toggle the status
            const response = await axiosPublic.patch(`/courses/${id}/update-status`, {
                isLive: newStatus, // Send the updated status to the backend
            });

            if (response.status === 200) {
                Swal.fire('Success', `Course is now ${newStatus ? 'Live' : 'Not Live'}`, 'success');
                window.location.reload()
                // Optionally, refetch data to reflect the updated status
            }
        } catch (error) {
            console.error("Error updating live status:", error);
            Swal.fire('Error', 'Failed to update live status', 'error');
        }
    };
    const isValidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
        } catch (err) {
            return false;
        }
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Teacher Courses</h1>

            {/* List of teacher's courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userdb.course && (
                    <div
                        className="p-4 border rounded shadow-md cursor-pointer"
                        onClick={() => setSelectedCourseId(selectedCourseId)}
                    >
                        {/* image */}
                        <img
                            src={userdb.course?.image}
                            alt={userdb.course?.name}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="card-body">
                            <h3 className="text-xl font-semibold">{userdb.course?.name}</h3>
                            <p>{userdb.course?.description}</p>

                        </div>
                        {/* Live Status Toggle */}
                        <div className="mt-2 flex items-center">
                            <label className="mr-2">Live Status:</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={userdb.course?.isLive}
                                    onChange={() => handleLiveStatusToggle(userdb.course?._id)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                )}
                {/* Form to update the class link */}
                {userdb.course && (
                    <div className="mt-6">
                        <input
                            type="url"
                            value={updatedLink}
                            onChange={(e) => setUpdatedLink(e.target.value)}
                            placeholder={userdb.course ? userdb.course.classLink : 'no link found'}
                            className={`p-2 border rounded w-full ${!isValidUrl(updatedLink) && updatedLink ? 'border-red-500' : ''}`}
                        />
                        {!isValidUrl(updatedLink) && updatedLink && (
                            <p className="text-red-500 mt-2">Please enter a valid URL starting with http:// or https://</p>
                        )}
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={handleClassLinkUpdate}
                                className="bg-green-500 text-white px-6 py-3 rounded"
                                disabled={!isValidUrl(updatedLink)} // Disable button if the link is invalid
                            >
                                Update Class Link
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

TeacherCourses.propTypes = {};

export default TeacherCourses;
