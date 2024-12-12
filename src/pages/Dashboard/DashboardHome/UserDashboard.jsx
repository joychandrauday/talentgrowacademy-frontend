import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDashboard = ({ user }) => {

    return (
        <div className="p-6 pt-0 min-h-screen">
            {/* Header Section */}
            <header className="flex justify-center items-center mb-6">
                <h1 className="text-3xl flex items-center gap-2 font-bold text-primary">
                    Welcome Back,
                    <span className="text-secondary">{user.name || 'User'}</span>
                    to TalentGrow Academy.
                </h1>
            </header>

            {/* Company Logo */}
            <div className="flex justify-center items-center mb-6">
                <img src={logo} alt="Company Logo" className="object-cover rounded-full" />
            </div>

            {
                user.status === 'active' && <>
                    {/* Card Section */}
                    <div className="LinkSection mt-24">
                        <div className="cardWrap flex gap-3">
                            {/* Left Cards */}
                            <div className="codeWrap flex w-full flex-col gap-3">
                                <div className="card-body bg-white border shadow-md text-center">
                                    <h2 className="text-primary capitalize font-bold italic text-xl mb-3">
                                        May I Help You?
                                    </h2>
                                    <button className="btn text-white hover:bg-primary bg-secondary">
                                        Get Link
                                    </button>
                                </div>

                                <div className="card-body bg-white border shadow-md text-center">
                                    <h2 className="text-primary capitalize font-bold italic text-xl mb-3">
                                        TalentGrow Academy Support Meeting
                                    </h2>
                                    <button className="btn text-white hover:bg-primary bg-secondary">
                                        Get Meeting Link
                                    </button>
                                </div>
                            </div>

                            {/* Support Team Card */}
                            <div className="cardWrap-2 w-full bg-white">
                                <div className="card-body border shadow-md text-center">
                                    <h2 className="text-primary capitalize font-bold text-xl italic">
                                        TalentGrow Academy Support Team
                                    </h2>
                                    <div className="supportLinkWrap flex flex-col gap-4 mt-5">
                                        <div className="supportOne flex justify-between">
                                            <div className="identity text-left italic">
                                                <h1 className="text-primary capitalize font-semibold">
                                                    Group Leader
                                                </h1>
                                                <h2 className="text-secondary font-semibold">

                                                </h2>
                                            </div>
                                            <div className="buttonLink">

                                            </div>
                                        </div>

                                        <div className="supportOne flex justify-between">
                                            <div className="identity text-left italic">
                                                <h1 className="text-primary capitalize font-semibold">
                                                    Trainer
                                                </h1>
                                                <h2 className="text-secondary font-semibold">Md. Hasan</h2>
                                            </div>
                                            <div className="buttonLink">
                                                <button className="btn bg-secondary">
                                                    <div className="flex gap-4 items-center text-white">
                                                        Contact Now <FaWhatsapp className="text-2xl" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="supportOne flex justify-between items-center">
                                            <div className="identity text-left italic">
                                                <h1 className="text-primary capitalize font-bold">
                                                    Support WhatsApp Group
                                                </h1>
                                            </div>
                                            <div className="buttonLink">
                                                <button className="btn bg-secondary">
                                                    <div className="flex gap-4 items-center text-white">
                                                        Join Now <FaWhatsapp className="text-2xl" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orientation Section */}
                    <div className="orientationSection mt-4 w-3/5 mx-auto">
                        <div className="card-body bg-white border shadow-md text-center">
                            <h2 className="text-primary capitalize font-bold italic text-xl mb-3">
                                Join Live Learning and Earning Classes<br />
                                BD Time: 8am to 10pm
                            </h2>
                            <div className="flex justify-between w-full px-12 items-center">
                                <h2 className="text-primary capitalize font-bold italic text-xl mb-3">
                                    Orientation Class
                                </h2>
                                <button className="btn text-white hover:bg-primary bg-secondary">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Course Links */}
                    <div className="courseLink mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index}
                                    className="card-body bg-white border shadow-md text-center"
                                >
                                    <h2 className="text-primary capitalize font-bold italic text-xl mb-3">
                                        Join Live Learning and Earning Classes<br />
                                        BD Time: 8am to 10pm
                                    </h2>
                                    <div className="flex justify-between w-full px-12 items-center">
                                        <h2 className="text-primary capitalize font-bold italic text-xl mb-3">
                                            Orientation Class
                                        </h2>
                                        <button className="btn text-white hover:bg-primary bg-secondary">
                                            Join Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

UserDashboard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string,
        balance: PropTypes.number,
    }).isRequired,
};

export default UserDashboard;
