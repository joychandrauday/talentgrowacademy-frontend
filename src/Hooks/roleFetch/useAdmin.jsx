import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';


const useAdmins = () => {
    const axiosPublic = useAxiosPublic()
    const fetchRole = async () => {
        const { data } = await axiosPublic.get('/admins');
        return data.data.admins;
    };

    const {
        data: admins = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['admins'],
        queryFn: fetchRole,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });
    const admin = admins[0]
    return { admin, isLoading, isError, refetch };
};

export default useAdmins;
