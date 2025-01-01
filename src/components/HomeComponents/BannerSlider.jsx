import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const BannerSlider = () => {
    const axiosPublic = useAxiosPublic();
    const [slides, setSlides] = useState([]);
    console.log(slides);
    // Fetching the banners from backend
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axiosPublic.get('/home-slider?type=home');
                setSlides(response.data); // Assuming the response data contains the slider images
            } catch (error) {
                console.error('Failed to fetch slider images:', error);
            }
        };

        fetchSlides();
    }, [axiosPublic]);

    return (
        <div className="min-h-screen">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide._id}>
                        <div
                            className="min-h-screen w-full flex items-center justify-center relative"
                            style={{
                                backgroundImage: `url('${slide.imageUrl}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Overlay */}
                            <div className="absolute min-h-screen w-full bg-gradient-to-b from-white to-transparent bg-opacity-75 z-10"></div>

                            {/* Content */}
                            <div className="wrap z-20 text-center container mx-auto">
                                <h1 className="text-4xl md:text-5xl font-bold text-primary">
                                    {slide.title}
                                </h1>
                                <p className="text-[14px] md:text-[18px] w-4/5 mx-auto text-gray-600 my-8">
                                    {slide.description}
                                </p>
                                <div className="gap-2 flex items-center justify-center">
                                    <Link
                                        to={'/about'}
                                        className="btn rounded-none w-32 border-2 border-primary hover:bg-primary hover:border-none hover:text-white bg-transparent"
                                    >
                                        Learn More
                                    </Link>
                                    <Link
                                        to={'/courses'}
                                        className="btn border-none rounded-none w-32 text-white bg-secondary hover:bg-primary"
                                    >
                                        All Courses
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
