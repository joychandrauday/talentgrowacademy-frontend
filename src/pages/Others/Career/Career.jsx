import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import emailjs from "emailjs-com";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const fetchJobs = async () => {
  const { data } = await axios.get("/jobs.json");
  return data;
};

const Career = () => {
  const navigate = useNavigate();

  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false); // Loader state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    position: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoadingSubmission(true); // Start the loader

    const templateParams = {
      to_name: "Admin Name", // Replace with the admin's name
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      from_whatsapp: formData.whatsapp,
      applied_position: formData.position,
    };

    emailjs
      .send("service_73dpibo", "template_4m959s8", templateParams, "fzZUIlhcc1N4osyMf")
      .then(
        (result) => {
          // SweetAlert confirmation
          Swal.fire({
            icon: "success",
            title: "Application Submitted",
            text: "Your application has been successfully submitted!",
          }).then(() => {
            navigate("/"); // Redirect to home
          });

          setIsModalOpen(false); // Close the modal
        },
        (error) => {
          console.error("Error sending email:", error.text);
        }
      )
      .finally(() => {
        setIsLoadingSubmission(false); // Stop the loader
      });
  };

  if (isLoading) return <div className="text-primary">Loading...</div>;
  if (error) return <div className="text-secondary">Error loading jobs.</div>;

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-primary mb-8">Career Opportunities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`bg-gradient-to-r from-[#2B6777] to-[#4A90A4] text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${job.status === "active" ? "border-primary" : "border-secondary"
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

              {job.jobResponsibilities?.length > 0 && (
                <ul className="mt-4 list-disc pl-5">
                  <p className="text-xl font-semibold text-[#F2A154]">Responsibilities:</p>
                  {job.jobResponsibilities.map((responsibility, index) => (
                    <li key={index} className="text-gray-100 mt-1">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              )}

              {job.status === "active" ? (
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, position: job.title }));
                    setIsModalOpen(true);
                  }}
                  className="mt-6 w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  Apply Now
                </button>
              ) : (
                <button
                  className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Closed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for the application form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              Apply for {formData.position}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors ${isLoadingSubmission
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                    }`}
                  disabled={isLoadingSubmission}
                >
                  {isLoadingSubmission ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ScrollRestoration />
    </div>
  );
};

export default Career;
