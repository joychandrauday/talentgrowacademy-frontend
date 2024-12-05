import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const BannerSlider = () => {
    return (
        <div className='min-h-screen'>
            <>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    // autoplay={{
                    //     delay: 4500,
                    //     disableOnInteraction: true,
                    // }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div
                            className="min-h-screen w-full flex items-center justify-center relative"
                            style={{
                                backgroundImage:
                                    "url('https://res.cloudinary.com/dab8rppoj/image/upload/v1733077430/carlos-muza-hpjSkU2UYSU-unsplash_k5mjdk.jpg')", // Use actual image URL
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* Overlay */}
                            <div className="absolute min-h-screen w-full bg-gradient-to-b from-white to-transparent bg-opacity-75 z-10"></div>


                            {/* Content on top of the overlay */}
                            <div className="wrap z-20 text-center container mx-auto ">

                                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                                    Welcome to Talent Grow Academy
                                </h1>
                                <p className="text-[14px] md:text-[18px] w-4/5 mx-auto text-gray-600 my-8">
                                    TalentGrowAcademy is a trusted Bangladeshi online platform designed to help you learn and grow from the comfort of your home. Using just your smartphone and your valuable free time, you can enhance your skills.
                                    Join our thriving community, explore a wide range of courses, services, and products, and pave the way for a brighter future. With TalentGrowAcademy, building your career has never been smoother!
                                </p>
                                <div className="gap-2 flex items-center justify-center">
                                    <Link to={'/about'} className="btn rounded-none w-32 border-2 border-primary hover:bg-primary hover:border-none hover:text-white bg-transparent ">Learn More</Link>
                                    <Link to={'/courses'} className="btn border-none rounded-none w-32 text-white  bg-secondary hover:bg-primary">All Courses</Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="min-h-screen w-full flex items-center justify-center relative"
                            style={{
                                backgroundImage:
                                    "url('https://res.cloudinary.com/dab8rppoj/image/upload/v1733077434/brooke-cagle-g1Kr4Ozfoac-unsplash_h0vfex.jpg')", // Use actual image URL
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* Overlay */}
                            <div className="absolute min-h-screen w-full bg-gradient-to-b from-white to-transparent bg-opacity-75 z-10"></div>


                            {/* Content on top of the overlay */}
                            <div className="wrap z-20 text-center container mx-auto ">

                                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                                    Welcome to Talent Grow Academy
                                </h1>
                                <p className="text-[14px] md:text-[18px] w-4/5 mx-auto text-gray-600 my-8">
                                    TalentGrowAcademy is a trusted Bangladeshi online platform designed to help you learn and grow from the comfort of your home. Using just your smartphone and your valuable free time, you can enhance your skills.
                                    Join our thriving community, explore a wide range of courses, services, and products, and pave the way for a brighter future. With TalentGrowAcademy, building your career has never been smoother!
                                </p>
                                <div className="gap-2 flex items-center justify-center">
                                    <Link to={'/about'} className="btn rounded-none w-32 border-2 border-primary hover:bg-primary hover:border-none hover:text-white bg-transparent ">Learn More</Link>
                                    <Link to={'/courses'} className="btn border-none rounded-none w-32 text-white  bg-secondary hover:bg-primary">All Courses</Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </>
        </div>
    );
};


BannerSlider.propTypes = {

};


export default BannerSlider;
