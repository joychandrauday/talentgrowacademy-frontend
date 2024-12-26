import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../useAxiosPublic';


const useCourses = () => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/courses');
        return data.data;
    };

    const {
        data: courses = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { courses, isLoading, isError, refetch };
};

export default useCourses;
