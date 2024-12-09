import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFetchUsers = (queryParams) => {
    const axiosPublic = useAxiosPublic();

    const fetchUsers = async () => {
        try {
            console.log("Fetching users with params:", queryParams); // Debug params
            const response = await axiosPublic.get('/users', { params: queryParams });
            console.log("API Response:", response.data); // Debug API response
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error; // Throw error for React Query to catch
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: fetchUsers,
        enabled: !!queryParams, // Ensure valid params before running query
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    return {
        users: data?.data || [],
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 0,
        currentPage: data?.currentPage || 1,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export default useFetchUsers;
