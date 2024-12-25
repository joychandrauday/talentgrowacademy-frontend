import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';

const useCard = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch function
    const fetchCards = async () => {
        const response = await axiosPublic.get('/cards');
        return response.data.data; // Access the "data" key inside the API response
    };

    const {
        data: cards = [], // Default to an empty array
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards,
        staleTime: 5 * 60 * 1000, // Cache trainers for 5 minutes
        cacheTime: 10 * 60 * 1000, // Keep data in memory for 10 minutes
    });

    return { cards, isLoading, isError, refetch };
};

export default useCard;
