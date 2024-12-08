import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const useUser = () => {
    const [userdb, setUser] = useState({});
    const axiosPublic = useAxiosPublic()
    // Example user data, this could come from props, context, or API
    const user = useContext(AuthContext)
    //async Await function
    const getUser = async () => {
        try {
            const response = await axiosPublic.get(`/users/${user.user.email}`);
            setUser(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Call the function when the component mounts
    useEffect(() => {
        getUser();
    }, []);

    return {
        userdb
    };
};

export default useUser;