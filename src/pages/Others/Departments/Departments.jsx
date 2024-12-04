import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollRestoration } from 'react-router-dom';

const Departments = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments data using axios
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/departments.json');
        setData(response.data); // Save the fetched data
        setIsLoading(false); // Data loaded successfully
      } catch (err) {
        setError(err); // Set error if something went wrong
        setIsLoading(false); // Stop loading on error
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading departments: {error.message}</div>;
  }

  return (
    <section className="py-32 bg-gray-100">
      <h2 className="text-5xl font-bold text-center text-[#2B6777] mb-12">Our Departments</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
        {data.map((dept, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg bg-[#2B6777] text-white transition-transform transform hover:scale-105"
          >
            <h3 className="text-3xl font-semibold mb-4">{dept.title}</h3>
            <p className="text-lg mb-4">{dept.description}</p>
            <h4 className="text-xl text-[#F2A154] font-bold mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {dept.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default Departments;
