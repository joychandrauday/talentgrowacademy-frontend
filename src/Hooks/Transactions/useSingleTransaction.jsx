import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';

const useSingleTransaction = (queryParams) => {
    console.log(queryParams);
    const axiosPublic = useAxiosPublic();

    // Function to fetch transactions from the backend
    const fetchTransactions = async () => {
        try {
            const response = await axiosPublic.get(`/transactions/user`, { params: queryParams });
            return response.data; // This should return { transactions, totalCount, totalPages, currentPage }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            throw error; // Throw error for React Query to catch and handle
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['transactions', queryParams],
        queryFn: fetchTransactions,
        enabled: !!queryParams, // Ensure valid params before running query
        staleTime: 60 * 60 * 1000, // Cache data for 1 hour
        retry: 2, // Retry twice if fetching fails
    });
    console.log(data);
    return {
        transactions: data?.transactions || [], // Transactions data from response
        totalCount: data?.pagination?.total || 0, // Total number of transactions
        totalPages: data?.pagination?.totalPages || 0, // Total number of pages based on limit
        currentPage: data?.pagination?.page || 1, // Current page number
        isLoading,
        isError,
        error,
        refetch,
    };
};

export default useSingleTransaction;
