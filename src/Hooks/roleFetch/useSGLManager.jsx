import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useSGLManager = () => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/sgl-managers');
        return data.data.seniorGroupLeaderManagers;
    };

    const {
        data: seniorGroupLeaderManagers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['seniorGroupLeaderManagers'],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { seniorGroupLeaderManagers, isLoading, isError, refetch };
};

export default useSGLManager;
