import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';

const useTransactions = ({ page = 1, limit = 10, sortBy = 'timestamp', sortOrder = 'desc', type, withdraw }) => {
    const axiosPublic = useAxiosPublic();

    // Fetch transactions from the API with dynamic query parameters
    const fetchTransactions = async () => {
        const response = await axiosPublic.get('/transactions', {
            params: {
                page,
                limit,
                sortBy,
                sortOrder,
                type, withdraw
            },
        });
        return response.data; // Assuming your response contains the data in the 'data' field
    };

    // Use React Query to fetch data and manage caching, error handling, etc.
    const queryResult = useQuery({
        queryKey: ['transactions', page, limit, sortBy, sortOrder, type, withdraw],  // The query key includes the parameters for caching and refetching
        queryFn: fetchTransactions,
        retry: 2, // Retry fetching in case of failure
        staleTime: 600000, // Data stays fresh for 10 minutes
        cacheTime: 900000, // Cache data for 15 minutes
        refetchOnWindowFocus: true, // Refetch when window is focused
        onError: (error) => {
            console.error('Error fetching transactions:', error);
        },
    });

    // Return the fetched transactions and any other necessary data
    return {
        transactions: queryResult.data?.transactions || [],  // Safe access if data is not available yet
        isLoading: queryResult.isLoading,
        isError: queryResult.isError,
        error: queryResult.error,
        isSuccess: queryResult.isSuccess,
        refetch: queryResult.refetch,
    };
};

export default useTransactions;
