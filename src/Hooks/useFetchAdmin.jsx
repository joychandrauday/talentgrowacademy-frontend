import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFetchAdmin = (initialQueryParams) => {
    const axiosPublic = useAxiosPublic();

    const [queryParams, setQueryParams] = useState(initialQueryParams);

    const fetchAdminData = async ({ queryKey }) => {
        const [, params] = queryKey; // Extract params from queryKey
        try {
            const response = await axiosPublic.get('/admins/alladmins', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching administrative users:', error);
            throw error;
        }
    };

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['fetchAdminData', queryParams],
        queryFn: fetchAdminData,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const updateQueryParams = (newParams) => {
        setQueryParams((prev) => ({ ...prev, ...newParams }));
    };
    console.log(data);

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        queryParams,
        updateQueryParams,
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
