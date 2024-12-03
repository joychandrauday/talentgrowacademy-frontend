import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { ScrollRestoration } from 'react-router-dom';

// Fetch jobs from the public folder
const fetchJobs = async () => {
    const { data } = await axios.get('/jobs.json');
    return data;
};

const Career = () => {
    const { data: jobs, isLoading, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs
    });

    if (isLoading) return <div className="text-primary">Loading...</div>;
    if (error) return <div className="text-secondary">Error loading jobs.</div>;

    return (
        <div className="min-h-screen pt-32 flex flex-col items-center py-10 px-4">
            <h1 className="text-4xl font-bold text-primary mb-8">Career Opportunities</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {jobs.map(job => (
                    <div
                        key={job.id}
                        className={`bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow duration-300 ${job.status === 'active' ? 'border-primary' : 'border-secondary'
                            }`}
                    >
                        <h2 className="text-xl font-semibold text-secondary">{job.title}</h2>
                        <p className="text-primary text-sm mt-1">{job.location} - {job.type}</p>
                        <p className="text-gray-600 mt-4">{job.description}</p>
                        <p className="text-gray-400 text-sm mt-4">Posted on: {new Date(job.postedAt).toLocaleDateString()}</p>

                        <ul className="mt-4 list-decimal list-inside">
                            <p className="text-primary font-semibold">Responsibilities:</p>
                            {job.jobResponsibilities.map((responsibility, index) => (
                                <li key={index} className="text-secondary">
                                    {responsibility}
                                </li>
                            ))}
                        </ul>

                        {job.status === 'active' ? (
                            <button className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors">
                                Apply Now
                            </button>
                        ) : (
                            <button className="mt-6 w-full bg-secondary text-white py-2 px-4 rounded-lg cursor-not-allowed" disabled>
                                Closed
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <ScrollRestoration />c
        </div>
    );
};

Career.propTypes = {
    jobs: PropTypes.array
};

export default Career;
