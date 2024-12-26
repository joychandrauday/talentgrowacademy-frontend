import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useTeacherManager = () => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/teacher-managers');
        return data.data.teacherManagers;
    };

    const {
        data: teacherManagers = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['teacherManagers'],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    return { teacherManagers, isLoading, isError, refetch };
};

export default useTeacherManager;
