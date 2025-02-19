
import useCourses from '../../../Hooks/roleFetch/useCourse';
import { Link } from 'react-router-dom';

const CoursesDash = () => {
    const { courses } = useCourses()

    return (
        <div className="p-6  text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">My Courses</h1>
                <h4 className="text-sm text-primary italic">
                    Access all skill development courses in one place.
                </h4>
            </div>

            <div className="grid gap-6 md:grid-cols-2 ">
                {[...courses]
                    .sort((a, b) => a.serial - b.serial) // Sorting courses by serial number
                    .map((course, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border  rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-400">{course.description}</p>

                            <Link to={`/dashboard/courses/${course._id}`} className="mt-4 w-full p-2 bg-secondary text-white rounded-md font-semibold hover:bg-opacity-80 transition">
                                Continue Course
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CoursesDash;
