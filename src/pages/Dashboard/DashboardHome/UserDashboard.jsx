import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import { FaWhatsapp } from 'react-icons/fa';

const UserDashboard = ({ user }) => {

    return (
        <div className="p-6 min-h-screen">
            {/* Header Section */}
            <header className="flex justify-center items-center mb-6">
                <h1 className="text-3xl items-center justify-center flex gap-2 font-bold text-primary">Welcome Back,
                    <div className="text-secondary"> {user.name || 'User'}</div> to TalentGrow Academy.</h1>
            </header>

            {/* Company Banner logo */}
            <div className="flex logo justify-center items-center mb-6">
                <img src={logo} alt="Company Logo" className="object-cover rounded-full" />
            </div>

            {/* Active User Section */}
            {user.status === "active" && (
                <>
                    <div className="LinkSection mt-24">
                        <div className="cardWrap flex gap-3">
                            <div className="codeWrap flex w-full flex-col gap-3">
                                {/* First Card: May I Help You */}
                                <div className="cardWrap-1">
                                    <div className="card-body bg-white border shadow-md text-center">
                                        <div className="card-header">
                                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>May I help you?</h2>
                                        </div>
                                        <div className="btn text-white hover:bg-primary bg-secondary">
                                            Get Link
                                        </div>
                                    </div>
                                </div>
                                {/* Second Card: TalentGrow Academy Support Meeting */}
                                <div className="cardWrap-1">
                                    <div className="card-body bg-white border shadow-md text-center">
                                        <div className="card-header">
                                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>TalentGrow Academy Support Meeting</h2>
                                        </div>
                                        <div className="btn text-white hover:bg-primary bg-secondary">
                                            Get meeting Link
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Support Team Section */}
                            <div className="cardWrap-2 w-full bg-white">
                                <div className="cardWrap-1 h-full">
                                    <div className="card-body border h-full shadow-md text-center">
                                        <div className="card-header">
                                            <h2 className='text-primary capitalize font-bold text-xl italic'>TalentGrow Academy Support Team</h2>
                                        </div>
                                        <div className="supportLinkWrap flex flex-col gap-4 mt-5 h-full">
                                            {/* Group Leader Contact */}
                                            <div className="supportOne flex justify-between">
                                                <div className="identity text-left italic">
                                                    <h1 className="text-primary capitalize font-semibold">Group Leader</h1>
                                                    <h2 className="text-secondary font-semibold">Md. Tarikul</h2>
                                                </div>
                                                <div className="buttonLink">
                                                    <div className="btn bg-secondary"><div className="flex gap-4 items-center text-white">Contact Now <FaWhatsapp className='text-2xl' /></div></div>
                                                </div>
                                            </div>
                                            {/* Trainer Contact */}
                                            <div className="supportOne flex justify-between">
                                                <div className="identity text-left italic">
                                                    <h1 className="text-primary capitalize font-semibold">Trainer</h1>
                                                    <h2 className="text-secondary font-semibold">Md. Hasan</h2>
                                                </div>
                                                <div className="buttonLink">
                                                    <div className="btn bg-secondary"><div className="flex gap-4 items-center text-white">Contact Now <FaWhatsapp className='text-2xl' /></div></div>
                                                </div>
                                            </div>
                                            {/* Support WhatsApp Group */}
                                            <div className="supportOne flex justify-between items-center">
                                                <div className="identity text-left italic">
                                                    <h1 className="text-primary capitalize font-bold">Support WhatsApp Group</h1>
                                                </div>
                                                <div className="buttonLink">
                                                    <div className="btn bg-secondary"><div className="flex gap-4 items-center text-white">Join Now <FaWhatsapp className='text-2xl' /></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orientation Section */}
                    <div className="orientationSection mt-4 w-3/5 mx-auto">
                        <div className="cardWrap-1">
                            <div className="card-body bg-white border shadow-md text-center ">
                                <div className="card-header">
                                    <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and Earning Classes<br />BD Time: (8am to 10pm)</h2>
                                </div>
                                <div className="flex justify-between w-full px-12 items-center">
                                    <div className="card-header">
                                        <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                                    </div>
                                    <div className="btn text-white hover:bg-primary bg-secondary">
                                        Join now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Link Section */}
                    <div className="courseLink mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Multiple Cards */}
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="card-body bg-white border shadow-md text-center">
                                    <div className="card-header">
                                        <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and Earning Classes<br />BD Time: (8am to 10pm)</h2>
                                    </div>
                                    <div className="flex justify-between w-full px-12 items-center">
                                        <div className="card-header">
                                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                                        </div>
                                        <div className="btn text-white hover:bg-primary bg-secondary">
                                            Join now
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Pending User Section */}
            {user.status === "pending" && (
                <div className="pending-status-container text-center mt-12">
                    <p className="text-primary font-semibold">
                        Your account is currently pending approval. Please wait until we contact you.
                        <div className="badge bg-secondary animate-pulse"></div>
                    </p>
                    <div className="pending-actions mt-4">
                        <button className="btn text-white rounded bg-primary hover:bg-secondary">
                            Emergency Contact with Controller
                        </button>
                    </div>
                </div>
            )}

            {/* Suspended User Section */}
            {user.status === "suspended" && (
                <div className="suspended-status-container text-center mt-12">
                    <p className="text-red-600 font-semibold">Your account has been suspended. Please contact support.</p>
                </div>
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
    }).isRequired,
};

export default UserDashboard;
