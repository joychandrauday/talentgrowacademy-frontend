import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png'
import { FaWhatsapp } from 'react-icons/fa';
const UserDashboard = ({ user }) => {


    return (
        <div className="p-6  min-h-screen">
            {/* Header Section */}
            <header className="flex justify-center items-center mb-6">
                <h1 className="text-3xl items-center justify-center flex gap-2 font-bold text-primary">Welcome Back,
                    <div className="text-secondary"> {user.name || 'User'}</div> to TalentGrow Academy.</h1>

            </header>

            {/* company Banner logo */}
            <div className="flex logo justify-center items-center mb-6">
                <img src={logo} alt="Company Logo" className=" object-cover rounded-full" />
            </div>
            <div className="LinkSection mt-24">
                <div className="cardWrap flex gap-3">
                    <div className="codeWrap flex w-full flex-col gap-3">
                        <div className="cardWrap-1">
                            <div className="card-body bg-white border shadow-md text-center">
                                <div className="card-header">
                                    <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>may i help you?</h2>
                                </div>
                                <div className="btn text-white hover:bg-primary bg-secondary">
                                    Get Link
                                </div>
                            </div>
                        </div>
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
                    <div className="cardWrap-2 w-full bg-white">
                        <div className="cardWrap-1 h-full">
                            <div className="card-body border h-full shadow-md text-center">
                                <div className="card-header">
                                    <h2 className='text-primary capitalize font-bold text-xl italic'>TalentGrow Academy Support Team</h2>
                                </div>
                                <div className="supportLinkWrap flex flex-col gap-4 mt-5 h-full ">
                                    <div className="supportOne flex justify-between ">
                                        <div className="identity text-left italic">
                                            <h1 className="text-primary capitalize font-semibold"> Group leader</h1>
                                            <h2 className="text-secondary font-semibold">Md. Tarikul</h2>
                                        </div>
                                        <div className="buttonLink">
                                            <div className="btn bg-secondary"><div className="flex gap-4 items-center text-white">Contact Now <FaWhatsapp className='text-2xl' /></div></div>
                                        </div>
                                    </div>
                                    <div className="supportOne flex justify-between">
                                        <div className="identity text-left italic">
                                            <h1 className="text-primary capitalize font-semibold">Trainer</h1>
                                            <h2 className="text-secondary font-semibold">Md. Hasan</h2>
                                        </div>
                                        <div className="buttonLink">
                                            <div className="btn bg-secondary"><div className="flex gap-4 items-center text-white">Contact Now <FaWhatsapp className='text-2xl' /></div></div>
                                        </div>
                                    </div>
                                    <div className="supportOne flex justify-between items-center">
                                        <div className="identity text-left italic">
                                            <h1 className="text-primary capitalize font-bold">Support Whatsapp Group</h1>
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
            <div className="orientationSection mt-4 w-3/5 mx-auto">
                <div className="cardWrap-1">
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
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
            <div className="courseLink mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
                            <div className="card-header">
                                <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                            </div>
                            <div className="btn text-white hover:bg-primary bg-secondary">
                                Join now
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
                            <div className="card-header">
                                <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                            </div>
                            <div className="btn text-white hover:bg-primary bg-secondary">
                                Join now
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
                            <div className="card-header">
                                <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                            </div>
                            <div className="btn text-white hover:bg-primary bg-secondary">
                                Join now
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
                            <div className="card-header">
                                <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                            </div>
                            <div className="btn text-white hover:bg-primary bg-secondary">
                                Join now
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
                            <div className="card-header">
                                <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Orientation Class</h2>
                            </div>
                            <div className="btn text-white hover:bg-primary bg-secondary">
                                Join now
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-white border shadow-md text-center ">
                        <div className="card-header">
                            <h2 className='text-primary capitalize font-bold italic text-xl mb-3'>Join Live Learning and earning Classes<br />BD Time:( 8am to 10pm)</h2>
                        </div>
                        <div className="flex justify-between w-full px-12 items-center ">
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
