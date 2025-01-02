import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../Hooks/useAxiosPublic"; // Adjust the path based on your project structure
import Heading from "../Shared/Heading";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const EventSlider = () => {
  const axiosPublic = useAxiosPublic()
  const { data: allEvents = [], isLoading, error } = useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const response = await axiosPublic.get("/events"); // Fetch all events
      return response.data;
    },
  });

  // Sort and limit events on the frontend
  const events = [...allEvents]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
    .slice(0, 2); // Limit to the last two events

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  return (
    <div className="md:my-6 md:mt-12">
      <Heading title="Upcoming Events" />
      <div className="flex justify-between md:flex-row flex-col md:mx-10 gap-10">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-slate-200 md:p-4 p-2 w-full md:flex gap-12 items-center justify-center  shadow rounded-xl"
          >
            <div className="stat basis-1/5 bg-primary text-white flex-1 rounded-xl">
              <div className="stat-value">
                {new Date(event.date).getDate()}
              </div>
              <h1>
                {new Date(event.date).toLocaleString("en-US", {
                  month: "long",
                })}
              </h1>
            </div>
            <div className="basis-4/5">
              <h1 className="font-bold text-2xl">{event.title}</h1>
              <p>
                {event.description.length > 150
                  ? `${event.description.slice(0, 150)}...`
                  : event.description}
              </p>
              <Link to={`/event/${event._id}`} className="btn rounded-none text-white bg-secondary border-none">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSlider;
