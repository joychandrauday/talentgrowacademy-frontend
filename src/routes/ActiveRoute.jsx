import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useUser from '../pages/Others/Register/useUser';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import InactiveRoute from './InactiveRoute';

const ActiveRoute = ({ children }) => {
    const { userdb } = useUser()
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isActive, setisActive] = useState(false); // Valid token state

    useEffect(() => {
        const verifyStatus = async () => {
            const activeToken = userdb?.status; // Retrieve the token
            if (activeToken) {
                try {

                    if (activeToken === 'active' || activeToken === 'inactive') {
                        setisActive(true); // Token is valid
                    } else if (activeToken === 'blocked') {
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

    if (isLoading) {
        // Show a loader while verifying the token
        return <LoadingSpinner />;
    }

    if (!isActive) {
        // Redirect to login if the token is invalid
        return <InactiveRoute />;
    }
    return children;

    // Render protected children if token is valid
};

// Props validation
ActiveRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ActiveRoute;
