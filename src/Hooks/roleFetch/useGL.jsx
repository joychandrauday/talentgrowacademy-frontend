import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useGL = (queryParams) => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/group-leaders', { params: queryParams });
        return data.data.groupLeaders;
    };

    const {
        data: groupLeaders = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['groupLeaders', queryParams],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { groupLeaders, isLoading, isError, refetch };
};

export default useGL;
