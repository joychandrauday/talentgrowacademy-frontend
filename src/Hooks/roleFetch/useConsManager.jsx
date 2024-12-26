import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useConsManager = () => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/consultant-managers');
        return data.data.consultantManagers;
    };

    const {
        data: consultantManagers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['consultantManagers'],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { consultantManagers, isLoading, isError, refetch };
};

export default useConsManager;
