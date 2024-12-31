
import { Link } from "react-router-dom";

const IconSection = () => {

  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-8 my-2 md:my-6 md:mx-20 mx-3">
      <Link to={'/courses'} className="w-full bg-slate-200 border gap-4 flex items-center justify-center md:p-5 p-2 shadow-lg rounded-xl hover:scale-105 hover:bg-secondary hover:text-white">
        <div className="">
          <img
            className="w-[96px] h-[96px]"
            src="https://res.cloudinary.com/dab8rppoj/image/upload/v1733141845/image_b7quzk.png"
            alt=""
          />
        </div>
        <div>
          <p className="font-bold text-3xl">
            10+ <br />
            Courses
          </p>
        </div>
      </Link>
      <div className="w-full bg-slate-200 gap-4 flex items-center justify-center md:p-5 p-2 shadow-xl rounded-xl hover:scale-105 hover:bg-secondary hover:text-white">
        <div className="">
          <img
            className="w-[96px] h-[96px]"
            src="https://res.cloudinary.com/dab8rppoj/image/upload/v1733141845/image2_x1wx75.png"
            alt=""
          />
        </div>
        <div>
          <p className="font-bold text-3xl">
            Expert <br />
            Mentors
          </p>
        </div>
      </div>
      <div className="w-full bg-slate-200 gap-4 flex items-center justify-center md:p-5 p-2 shadow-xl rounded-xl hover:scale-105 hover:bg-secondary hover:text-white">
        <div className="">
          <img
            className="w-[96px] h-[96px]"
            src="https://res.cloudinary.com/dab8rppoj/image/upload/v1733141845/image3_musup8.png"
            alt=""
          />
        </div>
        <div>
          <p className="font-bold text-3xl">
            Lifetime <br />
            Access
          </p>
        </div>
      </div>
    </div >
  );
};



export default IconSection;
