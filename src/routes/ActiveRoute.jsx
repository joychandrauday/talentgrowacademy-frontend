import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Fix the import
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useUser from '../pages/Others/Register/useUser';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import InactiveRoute from './InactiveRoute';

const ActiveRoute = ({ children }) => {
    const { userdb } = useUser()
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isActive, setisActive] = useState(false); // Valid token state

    useEffect(() => {
        const verifyStatus = async () => {
            const activeToken = userdb?.status; // Retrieve the token
            if (activeToken) {
                try {

                    if (activeToken === 'active') {
                        setisActive(true); // Token is valid
                    } else {
                        setisActive(false); // Token is not valid
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    setisActive(false);
                }
            } else {
                setisActive(false); // No token found
            }
            setIsLoading(false); // Stop loading
        };



        verifyStatus(); // Start verification on mount
    }, [userdb?.status]);
    console.log(isActive);
    if (isLoading) {
        // Show a loader while verifying the token
        return <LoadingSpinner />;
    }

    if (!isActive) {
        // Redirect to login if the token is invalid
        return <InactiveRoute />;
    }

    // Render protected children if token is valid
    return children;
};

// Props validation
ActiveRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ActiveRoute;
