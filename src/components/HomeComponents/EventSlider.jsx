import PropTypes from "prop-types";

const EventSlider = () => {
  return (
    <>
      <div className="md:my-6">
        <h1 className="text-center text-[#2B6777] font-bold md:text-[50px] text-2xl md:my-10">
          Upcoming Events
        </h1>
        <div className="flex md:flex-row flex-col md:mx-10 gap-4">
          <div className="bg-slate-200 md:p-4 p-2 md:flex gap-3 items-center justify-center shadow rounded-xl">
            <div className="stat bg-[#2B6777] text-white flex-1 rounded-xl  ">
              <div className="stat-value">15</div>
              <h1 className="">December</h1>
            </div>
            <div>
              <h1 className="font-bold text-2xl">Black Friday</h1>
              <p>
                Unlock unbeatable deals this Black Friday at TalentGrow
                Academy!Enjoy exclusive discounts on our top courses, products,
                and services. Do not miss the chance to enhance your skills and
                grow with us.
              </p>
              <button className="btn text-white bg-secondary border-none">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-slate-200 md:p-4 p-2 md:flex gap-3 items-center justify-center shadow rounded-xl">
            <div className="stat bg-[#2B6777] text-white flex-1 rounded-xl ">
              <div className="stat-value">19</div>
              <h1 className="">January</h1>
            </div>
            <div>
              <h1 className="font-bold text-2xl">New Year Sale!</h1>
              <p>
                Unlock unbeatable deals this New Year Sale at TalentGrow
                Academy!Enjoy exclusive discounts on our top courses, products,
                and services. Do not miss the chance to enhance your skills and
                grow with us.
              </p>
              <button className="btn text-white bg-secondary border-none">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EventSlider.propTypes = {};

export default EventSlider;
