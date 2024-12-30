import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useControllers = (queryParams) => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/controllers', { params: queryParams });
        return data.data.controllers;
    };

    const {
        data: controllers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['controllers', queryParams],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { controllers, isLoading, isError, refetch };
};

export default useControllers;
