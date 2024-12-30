import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useConsultant = (queryParams) => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/consultants', { params: queryParams });
        return data.data.consultant;
    };

    const {
        data: consultants = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['consultant', queryParams],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { consultants, isLoading, isError, refetch };
};

export default useConsultant;
