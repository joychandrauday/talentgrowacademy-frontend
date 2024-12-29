import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../useAxiosPublic';


const useTrainers = (queryParams) => {
    const axiosPublic = useAxiosPublic()
    const fetchUsers = async () => {
        const { data } = await axiosPublic.get('/trainers', { params: queryParams });
        return data.data.trainers;
    };

    const {
        data: trainers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['trainers', queryParams],
        queryFn: fetchUsers,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { trainers, isLoading, isError, refetch };
};

export default useTrainers;
