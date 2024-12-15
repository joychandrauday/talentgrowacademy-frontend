import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const useUser = () => {
    const [userdb, setUser] = useState({});
    const axiosPublic = useAxiosPublic()
    // Example user data, this could come from props, context, or API
    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken'); // Example: Storing token in localStorage
        const response = await axiosPublic('/users/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        const data = response.data.data.user
        setUser(data)
        console.log("token user", data); // { success: true, data: { role: 'Admin', email: 'admin@example.com' } }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    return {
        userdb
    };
};

export default useUser;