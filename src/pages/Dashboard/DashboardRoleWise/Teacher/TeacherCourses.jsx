import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useUser from '../../../Others/Register/useUser';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const TeacherCourses = () => {
    const { userdb } = useUser();
    const [updatedLink, setUpdatedLink] = useState('');
    const axiosPublic = useAxiosPublic();

    // Fetch courses assigned to the teacher
    const fetchCourses = async () => {
        const { data } = await axiosPublic.get(`/courses/teacher/${userdb._id}`);
        console.log(data);
        return data.courses;
    };

    const {
        data: courses = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['courses', userdb._id],
        queryFn: fetchCourses,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        cacheTime: 10 * 60 * 1000, // Data expires in 10 minutes
    });

    const handleClassLinkUpdate = async (courseId) => {
        if (!updatedLink) {
            Swal.fire('Error', 'Please enter a valid link', 'error');
            return;
        }

        try {
            const response = await axiosPublic.patch(`/courses/${courseId}/update-class-link`, {
                classLink: updatedLink,
            });

            if (response.status === 200) {
                Swal.fire('Success', 'Class link updated successfully', 'success');
                refetch();
                setUpdatedLink('');
            }
        } catch (error) {
            console.error('Error updating class link:', error);
            Swal.fire('Error', 'Failed to update class link', 'error');
        }
    };

    const handleLiveStatusToggle = async (courseId, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            const response = await axiosPublic.patch(`/courses/${courseId}/update-status`, {
                isLive: newStatus,
            });

            if (response.status === 200) {
                Swal.fire('Success', `Course is now ${newStatus ? 'Live' : 'Not Live'}`, 'success');
                refetch();
            }
        } catch (error) {
            console.error('Error updating live status:', error);
            Swal.fire('Error', 'Failed to update live status', 'error');
        }
    };

    const isValidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
        } catch {
            return false;
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading courses.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Teacher Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div key={course._id} className="p-4 border rounded shadow-md">
                        {/* Course Image */}
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-48 object-cover rounded-md"
                        />

                        {/* Course Details */}
                        <div className="card-body">
                            <h3 className="text-xl font-semibold">{course.name}</h3>
                            <p>{course.description}</p>
                        </div>

                        {/* Live Status Toggle */}
                        <div className="mt-2 flex items-center">
                            <label className="mr-2">Live Status:</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={course.isLive}
                                    onChange={() => handleLiveStatusToggle(course._id, course.isLive)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        {/* Class Link Update */}
                        <div className="mt-6">
                            <input
                                type="url"
                                value={updatedLink}
                                onChange={(e) => setUpdatedLink(e.target.value)}
                                placeholder={course.classLink || 'Enter new class link'}
                                className={`p-2 border rounded w-full ${!isValidUrl(updatedLink) && updatedLink ? 'border-red-500' : ''
                                    }`}
                            />
                            {!isValidUrl(updatedLink) && updatedLink && (
                                <p className="text-red-500 mt-2">
                                    Please enter a valid URL starting with http:// or https://
                                </p>
                            )}
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => handleClassLinkUpdate(course._id)}
                                    className="bg-green-500 text-white px-6 py-3 rounded"
                                    disabled={!isValidUrl(updatedLink)}
                                >
                                    Update Class Link
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherCourses;
