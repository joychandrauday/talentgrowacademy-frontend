import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Fix the import
import useAxiosPublic from '../Hooks/useAxiosPublic';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const axiosPublic = useAxiosPublic(); // Axios instance with refresh token logic
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isTokenValid, setIsTokenValid] = useState(false); // Valid token state

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('authToken'); // Retrieve the token
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          const expiryTime = decodedToken?.exp * 1000;

          if (expiryTime < Date.now()) {
            await refreshToken(); // Try refreshing if expired
          } else {
            setIsTokenValid(true); // Token is valid
          }
        } catch (error) {
          console.error('Invalid token:', error);
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false); // No token found
      }
      setIsLoading(false); // Stop loading
    };

    const refreshToken = async () => {
      try {
        const response = await axiosPublic.post('/refresh-token');
        const newAccessToken = response.data?.data?.token;

        if (newAccessToken) {
          localStorage.setItem('authToken', newAccessToken); // Update token
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        setIsTokenValid(false);
      }
    };

    verifyToken(); // Start verification on mount
  }, [axiosPublic]);

  if (isLoading) {
    // Show a loader while verifying the token
    return <LoadingSpinner />;
  }

  if (!isTokenValid) {
    // Redirect to login if the token is invalid
    return <Navigate state={{ from: location }} to="/login" />;
  }

  // Render protected children if token is valid
  return children;
};

// Props validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
