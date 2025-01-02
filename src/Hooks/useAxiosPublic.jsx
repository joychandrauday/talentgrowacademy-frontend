import axios from 'axios';

const useAxiosPublic = () => {
    const axiosInstance = axios.create({
        // baseURL: import.meta.env.API_URL
        // baseURL: 'http://localhost:3000'
        // baseURL: 'https://talentgrowacademy-backend.vercel.app'
        baseURL: 'https://talentgrowacademy-backend.onrender.com'
    });

    return axiosInstance;
};

export default useAxiosPublic;
