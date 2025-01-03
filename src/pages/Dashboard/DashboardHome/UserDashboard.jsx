import PropTypes from "prop-types";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useCard from "../../../Hooks/roleFetch/useCard";
import banners from "/public/DashboardSlider.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const UserDashboard = ({ user }) => {
  const axiosPublic = useAxiosPublic();
  const { cards } = useCard();
  const [slides, setSlides] = useState([]);
  // Fetching the banners from backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axiosPublic.get('/home-slider?type=dashboard');
        setSlides(response.data); // Assuming the response data contains the slider images
      } catch (error) {
        console.error('Failed to fetch slider images:', error);
      }
    };

    fetchSlides();
  }, [axiosPublic]);


  const helpCard = cards.filter((card) => card.ID === "userDashboardHelp");
  const supportMeetCard = cards.filter(
    (card) => card.ID === "userDashboardSupportMeet"
  );
  const supportWhatsappCard = cards.filter(
    (card) => card.ID === "userDashboardSupportWhatsapp"
  );
  const orientationCard = cards.filter(
    (card) => card.ID === "userDashboardOrientation"
  );

  const fetchCourses = async () => {
    const response = await axiosPublic.get("/courses", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  };

  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses: {error.message}</p>;

  return (
    <div className="p-6 pt-0 min-h-screen ">
      {/* Header Section */}
      <header className="flex justify-center items-center mb-6 text-center">
        <h1 className="text-xl sm:text-3xl font-bold text-primary">
          Welcome Back,{" "}
          <span className="text-secondary">{user.name || "User"}</span> to
          TalentGrow Academy.
        </h1>
      </header>

      {/* banner slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.imageUrl}
              alt={`Banner ${index + 1}`}
              className="w-full sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {user.status === "blocked" && (
        <>
          <div className="blockScreen flex justify-center items-center">
            <div className="blockScreenInner text-primary text-center">
              <h1 className="font-bold text-2xl">
                Your account has been blocked
              </h1>
              <p>Contact your admin to unlock your account.</p>
            </div>
          </div>
        </>
      )}
      {user.status === "active" && (
        <>
          {/* Card Section */}
          <div className="LinkSection mt-12">
            <div className="cardWrap flex flex-col sm:flex-row gap-6">
              {/* Left Cards */}
              <div className="codeWrap flex flex-col gap-6 sm:w-1/2">
                <div className="card-body bg-white border shadow-md text-center p-6">
                  <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                    {helpCard[0]?.title}
                  </h2>
                  <Link
                    to={`${helpCard[0]?.link1}`}
                    className="btn text-white hover:bg-primary bg-secondary"
                  >
                    <div className="flex gap-2 items-center text-white">
                      Get Link
                    </div>
                  </Link>
                </div>

                <div className="card-body bg-white border shadow-md text-center p-6">
                  <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                    {supportMeetCard[0]?.title}
                  </h2>
                  <Link
                    to={`${supportMeetCard[0]?.link1}`}
                    className="btn text-white hover:bg-primary bg-secondary"
                  >
                    <div className="flex gap-2 items-center text-white">
                      Get Metting Link
                    </div>
                  </Link>
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
                      <h1 className="text-primary capitalize font-semibold">
                        Group Leader
                      </h1>
                      <h2 className="text-secondary font-semibold">
                        {user.groupLeader?.name}
                      </h2>
                    </div>
                    <div className="buttonLink">
                      <Link
                        to={`https://wa.me/${user.groupLeader?.whatsapp.replace(
                          /[\s()-]/g,
                          ""
                        )}`}
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
                      <h1 className="text-primary capitalize font-semibold">
                        Trainer
                      </h1>
                      <h2 className="text-secondary font-semibold">
                        {user.trainer?.name}
                      </h2>
                    </div>
                    <div className="buttonLink">
                      <Link
                        to={`https://wa.me/${user.trainer?.whatsapp.replace(
                          /[\s()-]/g,
                          ""
                        )}`}
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
                      <h2 className="text-primary capitalize font-bold italic text-lg sm:text-xl mb-3">
                        {supportWhatsappCard[0]?.title}
                      </h2>
                    </div>
                    <div className="buttonLink">
                      <Link
                        to={`${supportWhatsappCard[0]?.link1}}`}
                        className="btn bg-secondary"
                      >
                        <div className="flex gap-2 items-center text-white">
                          Contact Now <FaWhatsapp className="text-2xl" />
                        </div>
                      </Link>
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
                {orientationCard[0]?.title}
              </h2>

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
                  {course?.classLink && course?.isLive ? (
                    <Link
                      to={`${course.classLink}`}
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
