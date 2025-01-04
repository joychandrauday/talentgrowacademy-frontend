import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";


const useUser = () => {
    const [userdb, setUser] = useState({});
    const axiosPublic = useAxiosPublic()
    // Example user data, this could come from props, context, or API
    const fetchUserData = async () => {

        try {
            const token = localStorage.getItem('authToken'); // Example: Storing token in localStorage
            const response = await axiosPublic('/users/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data
            setUser(data)
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('authToken'); // Clear invalid token
                window.location.href = '/login'; // Redirect to login
            }
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    return {
        userdb
    };
};

export default useUser;