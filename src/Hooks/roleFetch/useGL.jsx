import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../useAxiosPublic';


const useGL = () => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/group-leaders');
        return data.data.groupLeaders;
    };

    const {
        data: groupLeaders = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['groupLeaders'],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    console.log(groupLeaders);
    return { groupLeaders, isLoading, isError, refetch };
};

export default useGL;
