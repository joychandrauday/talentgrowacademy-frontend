import { useState, useEffect } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const useUser = () => {
    const [userdb, setUser] = useState({});
    const axiosPublic = useAxiosPublic();

    // Fetch user data with handling for expired sessions
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Get token from localStorage
            if (!token) {
                // If no token is present, redirect to login
                window.location.href = '/login';
                return;
            }

            const response = await axiosPublic('/users/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data;
            setUser(data); // Set user data in state
        } catch (error) {
            // Handle 401 Unauthorized or other errors
            if (error.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('authToken'); // Clear invalid token
                window.location.href = '/login'; // Redirect to login page
            }
            else if (error.response?.status === 403) {
                // Handle Forbidden access - likely due to invalid/expired token
                // toast.error('You do not have permission to access this resource.');
                localStorage.removeItem('authToken'); // Clear invalid token
                window.location.href = '/login'; // Redirect to login
            } else {
                // Handle other potential errors
                toast.error('An error occurred while fetching user data.');
            }
        }
    };

    // Fetch user data when component mounts
    useEffect(() => {
        fetchUserData();
    }, []);

    return {
        userdb,
    };
};

export default useUser;
