import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const UseAdministration = ({ identifier, fieldname }) => {
    const axiosPublic = useAxiosPublic();

    // Define the fetcher function
    const fetchFieldData = async () => {
        const response = await axiosPublic.get(`/users/${identifier}`);
        console.log(response.data.data[fieldname]);
        return response.data.data[fieldname];
        // if (response.data && fieldname in response.data) {
        // } else {
        //     throw new Error(`Field "${fieldname}" not found in response data.`);
        // }
    };

    // Use `useQuery` with the object form
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userField', identifier, fieldname], // Unique query key
        queryFn: fetchFieldData, // Fetcher function
        enabled: Boolean(identifier && fieldname), // Only fetch when identifier and fieldname are valid
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    console.log(data);
    return (
        data
    );
};

UseAdministration.propTypes = {
    identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fieldname: PropTypes.string.isRequired,
};

export default UseAdministration;
