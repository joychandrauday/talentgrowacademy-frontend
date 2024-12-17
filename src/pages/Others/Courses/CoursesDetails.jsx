import { Link } from "react-router-dom"


export const CoursesDetails = () => {

  const details = {
    "title": "Photo Editing",
    "category": "Media & Arts",
    "description": "Enhance your photos with professional editing techniques using tools like Adobe Photoshop and Lightroom. Learn retouching and color correction.",
    "image": "https://res.cloudinary.com/dab8rppoj/image/upload/v1732942936/PhotoEditing_aqb45r.png",
    "teacherName": "",
    "teacherId": "",
    "classLinks": [
        {
            "link": "",
            "createdAt": ""
        }
    ]
}
  return (
    <div className="my-32 px-6 lg:px-24 flex flex-col lg:flex-row items-center lg:justify-between gap-12">
  {/* Left Section */}
  <div className="space-y-6 flex-1">
    <h1 className="text-center lg:text-left text-4xl font-bold bg-gradient-to-r from-[#1A73E8] to-[#FF5733] text-transparent bg-clip-text">
      {details.title}
    </h1>
    <p className="text-lg text-gray-700 leading-relaxed">
      {details.description}
    </p>
  </div>

  {/* Right Section */}
  <div className="flex-1 w-full lg:w-[500px] h-auto bg-white rounded-xl shadow-2xl overflow-hidden">
    <img
      className="w-full h-[250px] md:h-[300px] lg:h-[400px] object-cover"
      src={details.image}
      alt={details.title}
    />
    <div className="p-6">
      <Link to="/join">
        <button className="btn w-full mt-4 bg-gradient-to-r from-[#FF5733] to-[#FFC300] text-white hover:opacity-90 transition-all duration-300 font-medium rounded-lg py-3">
          Join Now
        </button>
      </Link>
    </div>
  </div>
</div>


  )
}
