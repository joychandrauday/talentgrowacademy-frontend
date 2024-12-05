import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";

// Fetch jobs from the public folder
const fetchJobs = async () => {
  const { data } = await axios.get("/jobs.json");
  return data;
};

const Career = () => {
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) return <div className="text-primary">Loading...</div>;
  if (error) return <div className="text-secondary">Error loading jobs.</div>;

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Career Opportunities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`bg-gradient-to-r from-[#2B6777] to-[#4A90A4] text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
              job.status === "active" ? "border-primary" : "border-secondary"
            }`}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <h2 className="text-2xl font-extrabold mb-2">{job.title}</h2>
              <p className="text-sm text-gray-200">
                {job.location} - {job.type}
              </p>
              <p className="mt-4 text-gray-100">{job.description}</p>
              <p className="text-sm mt-4 text-gray-300">
                Posted on:{" "}
                <span className="font-bold">
                  {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </p>

              {job.jobResponsibilities &&
                job.jobResponsibilities.length > 0 && (
                  <ul className="mt-4 list-disc pl-5">
                    <p className="text-xl font-semibold text-[#F2A154]">
                      Responsibilities:
                    </p>
                    {job.jobResponsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-100 mt-1">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                )}

              {job.status === "active" ? (
                <button className="mt-6 w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors">
                  Apply Now
                </button>
              ) : (
                <button
                  className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg cursor-not-allowed"
                  disabled
                  aria-disabled="true"
                >
                  Closed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Career;
