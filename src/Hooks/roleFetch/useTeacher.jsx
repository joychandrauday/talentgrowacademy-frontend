import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useTeacher = (queryParams) => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/teachers', { params: queryParams });
        return data.data.teacchers;
    };

    const {
        data: teachers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['teacchers', queryParams],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { teachers, isLoading, isError, refetch };
};

export default useTeacher;
