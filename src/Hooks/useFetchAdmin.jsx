import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFetchAdmin = (initialQueryParams) => {
    const axiosPublic = useAxiosPublic();

    const [queryParams, setQueryParams] = useState(initialQueryParams);

    const fetchAdminData = async ({ queryKey }) => {
        const [, params] = queryKey; // Extract params from queryKey
        try {
            console.log('fetching with', params);
            const response = await axiosPublic.get('/admins/alladmins', { params });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching administrative users:', error);
            throw error;
        }
    };

    // Using useQuery to fetch data
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['fetchAdminData', queryParams], // Query key includes params
        queryFn: fetchAdminData, // Fetch function
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
};

useFetchAdmin.propTypes = {
    initialQueryParams: PropTypes.shape({
        searchTerm: PropTypes.string,
        role: PropTypes.string,
        status: PropTypes.string,
        sort: PropTypes.string,
        limit: PropTypes.number,
        page: PropTypes.number,
        fromDate: PropTypes.string,
        toDate: PropTypes.string,
    }),
};

export default useFetchAdmin;
