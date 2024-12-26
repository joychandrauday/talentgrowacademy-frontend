import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../useAxiosPublic';


const useTrainers = () => {
    const axiosPublic = useAxiosPublic()
    const fetchTrainers = async () => {
        const { data } = await axiosPublic.get('/trainers');
        return data.data.trainers;
    };

    const {
        data: trainers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['trainers'],
        queryFn: fetchTrainers,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { trainers, isLoading, isError, refetch };
};

export default useTrainers;
