import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAdmins = (queryParams) => {
    const axiosPublic = useAxiosPublic();

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axiosPublic.get('/admins/alladmins', { params: queryParams });
            return response.data; // This should return { users, totalCount, totalPages, currentPage }
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error; // Throw error for React Query to catch and handle
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['admins', queryParams],
        queryFn: fetchUsers,
        enabled: !!queryParams, // Ensure valid params before running query
        staleTime: 60 * 60 * 1000, // Cache data for 5 minutes
        retry: 2, // Retry twice if fetching fails
    });
    return {
        admins: data?.data?.users || [], // Users data from response
        totalCount: data?.data?.totalCount || 0, // Total number of users
        totalInactive: data?.data?.totalInactive,
        totalPages: data?.data?.totalPages || 0, // Total number of pages based on limit
        currentPage: data?.data?.currentPage || 1, // Current page number
        isLoading,
        isError,
        error,
        refetch,
    };
};

export default useAdmins;
