import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Fix the import
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const GlRoutes = ({ children }) => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic(); // Axios instance with refresh token logic
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isRoleValid, setisRoleValid] = useState(false); // Valid token state

    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem('authToken'); // Retrieve the token
            if (storedToken) {
                try {
                    const decodedToken = jwtDecode(storedToken);
                    if (decodedToken.role === 'group-leader') {
                        setisRoleValid(true); // Token is valid
                    } else {
                        setisRoleValid(false); // Token is not valid
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    setisRoleValid(false);
                }
            } else {
                setisRoleValid(false); // No token found
            }
            setIsLoading(false); // Stop loading
        };



        verifyToken(); // Start verification on mount
    }, [axiosPublic]);

    if (isLoading) {
        // Show a loader while verifying the token
        return <LoadingSpinner />;
    }

    if (!isRoleValid) {
        // Redirect to login if the token is invalid
        return <Navigate state={{ from: location }} to="/login" />;
    }

    // Render protected children if token is valid
    return children;
};

// Props validation
GlRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlRoutes;
