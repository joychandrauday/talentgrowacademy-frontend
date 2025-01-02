import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Fix the import
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useUser from '../pages/Others/Register/useUser';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { userdb } = useUser()
    const location = useLocation();
    const axiosPublic = useAxiosPublic(); // Axios instance with refresh token logic
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isAdminValid, setisAdminValid] = useState(false); // Valid token state

    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem('authToken'); // Retrieve the token
            if (storedToken) {
                try {
                    const decodedToken = jwtDecode(storedToken);
                    if (decodedToken.role === 'admin') {
                        setisAdminValid(true); // Token is valid
                    } else {
                        setisAdminValid(false); // Token is not valid
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    setisAdminValid(false);
                }
            } else {
                setisAdminValid(false); // No token found
            }
            setIsLoading(false); // Stop loading
        };



        verifyToken(); // Start verification on mount
    }, [axiosPublic]);

    if (isLoading) {
        // Show a loader while verifying the token
        return <LoadingSpinner />;
    }

    if (!isAdminValid) {
        // Redirect to login if the token is invalid
        return <Navigate state={{ from: location }} to="/login" />;
    }

    // Render protected children if token is valid
    return children;
};

// Props validation
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;
