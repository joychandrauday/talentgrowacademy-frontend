import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Heading from "../../../components/Shared/Heading";

const SingleEvent = () => {
    const { eventId } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: event, isLoading, error } = useQuery({
        queryKey: ["event", eventId],
        queryFn: async () => {
            const response = await axiosPublic.get(`/events/${eventId}`);
            return response.data;
        },
        enabled: !!eventId,
    });

    if (isLoading) {
        return <div className="text-center text-lg">Loading event details...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Error fetching event: {error.message}
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center text-gray-500">
                Event not found or no data available.
            </div>
        );
    }

    return (
        <div className="md:mx-10 md:mt-32 mx-4 my-6">
            {/* Banner Section */}
            <div
                className="relative h-64 bg-cover bg-center rounded-lg"
                style={{
                    backgroundImage: `url(${event?.banner || "/default-banner.jpg"})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4 rounded-lg">
                    <h1 className="text-4xl font-bold">{event?.title}</h1>
                    <p className="mt-2 text-lg">
                        {new Date(event?.date).toLocaleString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {/* Event Details Section */}
            <div className="bg-slate-200 p-6 shadow-md rounded-lg mt-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Redesigned Date Section */}
                    <div className="flex items-center justify-center space-x-4">
                        <div className="w-20 h-20 bg-[#2B6777] text-white rounded-full flex items-center justify-center text-4xl font-bold">
                            {new Date(event?.date).getDate()}
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg text-gray-600 font-semibold">
                                {new Date(event?.date).toLocaleString("en-US", { month: "long" })}
                            </h2>
                            <h3 className="text-sm text-gray-500">
                                {new Date(event?.date).getFullYear()}
                            </h3>
                        </div>
                    </div>

                    {/* Event Title and Description */}
                    <div>
                        <h1 className="font-bold text-3xl">{event?.title}</h1>
                        <p className="text-gray-700 mt-4">{event?.description}</p>
                    </div>
                </div>

                {/* Detailed Section */}
                <div className="mt-6">
                    <h2 className="font-bold text-xl mb-2">Event Details:</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {event?.details?.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>

                {/* Register Button */}
                <Link to={event.registerLink} className="btn btn-secondary mt-6 text-white bg-secondary border-none hover:bg-secondary-dark">
                    Register Now
                </Link>
            </div>
        </div>
    );
};

export default SingleEvent;
