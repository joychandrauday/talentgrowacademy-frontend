import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UserDashboard = ({ user }) => {
    const axiosPublic = useAxiosPublic();

    const fetchCourses = async () => {
        const response = await axiosPublic.get('/courses', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data;
    };

    const { data: courses = [], isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
    });

    if (isLoading) return <p>Loading courses...</p>;
    if (error) return <p>Error fetching courses: {error.message}</p>;

    return (
        <div className="p-6 pt-0 min-h-screen ">
            {/* Header Section */}
            <header className="flex justify-center items-center mb-6 text-center">
                <h1 className="text-xl sm:text-3xl font-bold text-primary">
                    Welcome Back,{' '}
                    <span className="text-secondary">{user.name || 'User'}</span>{' '}
                    to TalentGrow Academy.
                </h1>
            </header>

            {/* Company Logo */}
            <div className="flex justify-center items-center mb-6">
                <img src={logo} alt="Company Logo" className="object-cover rounded-full w-44 sm:w-24 lg:w-72" />
            </div>

            {user.status === 'active' && (
                <>
                    {/* Card Section */}
                    <div className="LinkSection mt-12">
                        <div className="cardWrap flex flex-col sm:flex-row gap-6">
                            {/* Left Cards */}
                            <div className="codeWrap flex flex-col gap-6 sm:w-1/2">
                                <div className="card-body bg-white border shadow-md text-center p-6">
                                    <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                                        May I Help You?
                                    </h2>
                                    <button className="btn text-white hover:bg-primary bg-secondary">
                                        Get Link
                                    </button>
                                </div>

                                <div className="card-body bg-white border shadow-md text-center p-6">
                                    <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                                        TalentGrow Academy Support Meeting
                                    </h2>
                                    <button className="btn text-white hover:bg-primary bg-secondary">
                                        Get Meeting Link
                                    </button>
                                </div>
                            </div>

                            {/* Support Team Card */}
                            <div className="cardWrap-2 bg-white border shadow-md text-center p-6 sm:w-1/2">
                                <h2 className="text-primary capitalize font-bold text-lg sm:text-xl italic mb-4">
                                    TalentGrow Academy Support Team
                                </h2>
                                <div className="supportLinkWrap flex flex-col gap-6">
                                    <div className="supportOne flex justify-between items-center">
                                        <div className="identity text-left italic">
                                            <h1 className="text-primary capitalize font-semibold">Group Leader</h1>
                                            <h2 className="text-secondary font-semibold">{user.groupLeader?.name}</h2>
                                        </div>
                                        <div className="buttonLink">
                                            <Link
                                                to={`https://wa.me/${user.groupLeader?.whatsapp.replace(/[\s()-]/g, '')}`}
                                                className="btn bg-secondary"
                                            >
                                                <div className="flex gap-2 items-center text-white">
                                                    Contact Now <FaWhatsapp className="text-2xl" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="supportOne flex justify-between items-center">
                                        <div className="identity text-left italic">
                                            <h1 className="text-primary capitalize font-semibold">Trainer</h1>
                                            <h2 className="text-secondary font-semibold">{user.trainer?.name}</h2>
                                        </div>
                                        <div className="buttonLink">
                                            <Link
                                                to={`https://wa.me/${user.trainer?.whatsapp.replace(/[\s()-]/g, '')}`}
                                                className="btn bg-secondary"
                                            >
                                                <div className="flex gap-2 items-center text-white">
                                                    Contact Now <FaWhatsapp className="text-2xl" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="supportOne flex justify-between items-center">
                                        <div className="identity text-left italic">
                                            <h1 className="text-primary capitalize font-bold">Support WhatsApp Group</h1>
                                        </div>
                                        <div className="buttonLink">
                                            <button className="btn bg-secondary">
                                                <div className="flex gap-2 items-center text-white">
                                                    Join Now <FaWhatsapp className="text-2xl" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orientation Section */}
                    <div className="orientationSection mt-12 w-full lg:w-4/5 mx-auto">
                        <div className="card-body bg-white border shadow-md text-center p-6">
                            <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                                Join Live Learning and Earning Classes<br />
                                BD Time: 8am to 10pm
                            </h2>
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-12">
                                <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl">
                                    Orientation Class
                                </h2>
                                <button className="btn text-white hover:bg-primary bg-secondary">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Course Links */}
                    <div className="courseLink mt-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="card-body bg-white border shadow-md text-center p-6"
                                >
                                    <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                                        {course.name}
                                    </h2>
                                    {course.classLinks[0].link ? (
                                        <Link
                                            to={course.classLinks[0].link}
                                            className="btn text-white hover:bg-primary bg-secondary"
                                        >
                                            Join Now
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="btn text-white hover:bg-primary bg-secondary"
                                        >
                                            No link found
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

UserDashboard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string,
        balance: PropTypes.number,
        status: PropTypes.string,
        groupLeader: PropTypes.shape({
            name: PropTypes.string,
            whatsapp: PropTypes.string,
        }),
        trainer: PropTypes.shape({
            name: PropTypes.string,
            whatsapp: PropTypes.string,
        }),
    }).isRequired,
};

export default UserDashboard;
