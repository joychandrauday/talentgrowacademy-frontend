import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useSGL = (queryParams) => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/sgls', { params: queryParams });
        return data.data.seniorGroupLeaders;
    };

    const {
        data: seniorGroupLeaders = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['seniorGroupLeaders', queryParams],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { seniorGroupLeaders, isLoading, isError, refetch };
};

export default useSGL;
