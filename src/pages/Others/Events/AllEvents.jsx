import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Heading from "../../../components/Shared/Heading";
import { Link } from "react-router-dom";

const AllEvents = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch all events using React Query
    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await axiosPublic.get("/events");
            return response.data; // Ensure the backend returns a list of events
        },
    });

    // Sort events by date
    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Loading state
    if (isLoading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    // Error state
    if (error) {
        return (
            <div className="text-center text-red-500">
                Error fetching events: {error.message}
            </div>
        );
    }

    // Render events
    return (
        <div className="md:mx-10 mt-20 mx-4 my-6">
            <Heading title="All Events" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event) => (
                    <div
                        key={event._id}
                        className="bg-slate-200 card-body p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* banenr image */}
                        <img src={event.banner} className="rounded-xl" alt="" />
                        <div className="flex items-center gap-3">

                            <div className="stat basis-2/5 bg-[#2B6777] text-white p-4 rounded-lg">
                                <div className="stat-value text-3xl font-bold">
                                    {new Date(event.date).getDate()}
                                </div>
                                <h1 className="text-lg">
                                    {new Date(event.date).toLocaleString("en-US", {
                                        month: "long",
                                    })}
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-bold text-xl">{event.title}</h1>
                                <p className="text-sm text-gray-700 mt-2">
                                    {event.description.length > 100
                                        ? `${event.description.slice(0, 100)}...`
                                        : event.description}
                                </p>
                            </div>
                        </div>
                        <Link to={`/event/${event._id}`} className="btn btn-secondary w-full mt-4 text-white bg-secondary border-none">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
