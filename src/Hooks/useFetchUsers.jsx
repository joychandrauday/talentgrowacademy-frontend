import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFetchUsers = (queryParams) => {
    const axiosPublic = useAxiosPublic();

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            console.log("Fetching users with params:", queryParams); // Debug params
            const response = await axiosPublic.get('/users', { params: queryParams });
            console.log("API Response:", response.data); // Debug API response
            return response.data; // This should return { users, totalCount, totalPages, currentPage }
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error; // Throw error for React Query to catch and handle
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: fetchUsers,
        enabled: !!queryParams, // Ensure valid params before running query
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        retry: 2, // Retry twice if fetching fails
    });
    console.log('fetch', data?.data?.users);
    return {
        users: data?.data?.users || [], // Users data from response
        totalCount: data?.data?.totalCount || 0, // Total number of users
        totalPages: data?.data?.totalPages || 0, // Total number of pages based on limit
        currentPage: data?.data?.currentPage || 1, // Current page number
        isLoading,
        isError,
        error,
        refetch,
    };
};

export default useFetchUsers;
