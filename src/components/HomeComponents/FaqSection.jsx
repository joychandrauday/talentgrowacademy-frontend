import React from "react";
import PropTypes from "prop-types";

const FaqSection = () => {
  return (
    <div>
        <h1 className="text-center uppercase md:text-[50px] text-2xl md:my-5 font-bold text-[#2B6777] ">Frequently Asked Questions</h1>
        <div className="join join-vertical w-full">
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-white bg-[#2B6777] text-[25px] font-bold">
        What is TalentGrow Academy Platform?
      </div>
      <div className="collapse-content">
        <p className="text-xl">
          TalentGrow Academy is a platform where you can enhance your performance through learning. As you showcase your talents on platforms like Facebook, YouTube, Instagram, and TikTok, you can also showcase them on the TalentGrow Academy BD E-learning Platform. It is a digital marketing platform where you can learn and improve your work ability or performance.
        </p>
      </div>
    </div>
  
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-white bg-[#2B6777] text-[25px] font-bold">
        Do we need admission here?
      </div>
      <div className="collapse-content">
        <p className="text-xl">
          Yes, you need to pay admission fees for taking the course, product, or services.
        </p>
      </div>
    </div>
  
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-white bg-[#2B6777] text-[25px] font-bold">
        Can we do this from the comfort of our home?
      </div>
      <div className="collapse-content">
        <p className="text-xl">
          Yes, you can take this course or services from your home because it is an online process.
        </p>
      </div>
    </div>
  
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-white bg-[#2B6777] text-[25px] font-bold">
        What kind of documents or gadgets do we need to do this course?
      </div>
      <div className="collapse-content">
        <p className="text-xl">
          You just need an electronic device like a mobile or a laptop and a steady internet connection.
        </p>
      </div>
    </div>
  
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-white bg-[#2B6777] text-[25px] font-bold">
        Is this a part-time or full-time work?
      </div>
      <div className="collapse-content">
        <p className="text-xl">
          It is not a job but a learning and earning process. You join as a learner and can earn by selling courses, goods, or services.
        </p>
      </div>
    </div>
  </div>
    </div>
  

  );
};

FaqSection.propTypes = {};

export default FaqSection;
