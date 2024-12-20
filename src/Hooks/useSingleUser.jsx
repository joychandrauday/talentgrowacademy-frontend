import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useSingleUser = (userID) => {
    const [singleuser, setUser] = useState({});  // Store user data
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        if (!userID) return;

        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Make the API call to fetch user by ID
                const response = await axiosPublic.get(`/users/${userID}`);  // Adjust URL as per your API
                setUser(response.data.data);  // Set user data to state
            } catch (err) {
                setError(err.message || 'An error occurred while fetching user data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);  // Re-run the effect if userID changes

    return { singleuser, isLoading, error };
};

export default useSingleUser;
