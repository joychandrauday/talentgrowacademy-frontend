import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const axiosPublic = useAxiosPublic(); // Axios instance with refresh token logic
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken')); // Initial state from localStorage
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (authToken) {
        try {
          const decodedToken = jwtDecode(authToken);
          const expiryTime = decodedToken?.exp * 1000; // Decode expiry time from the token

          // If the token is expired, attempt to refresh it
          if (expiryTime < Date.now()) {
            await refreshToken();
          } else {
            setIsTokenValid(true); // Token is valid, proceed
          }
        } catch (error) {
          console.error('Invalid token:', error);
          setIsTokenValid(false); // If decoding fails, treat it as an invalid token
        }
      } else {
        setIsTokenValid(false); // No token present, consider it invalid
      }
    };

    verifyToken();
  }, [authToken]);

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const response = await axiosPublic.post('/refresh-token'); // Call the refresh token endpoint
      const newAccessToken = response.data?.data?.token;

      // Update the local storage with the new token
      if (newAccessToken) {
        localStorage.setItem('authToken', newAccessToken);
        setAuthToken(newAccessToken); // Update state with new token
        setIsTokenValid(true); // Token refreshed and valid now
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setIsTokenValid(false); // If refresh fails, invalidate the token
    }
  };

  // Show loading spinner while authentication is in progress
  if (!isTokenValid) {
    return <div className="flex items-center justify-center min-h-screen"><span className="loading loading-dots loading-lg"></span></div>;
  }

  // If there's no valid token, redirect to login
  if (!isTokenValid) {
    return <Navigate state={{ from: location }} to="/login" />;
  }

  // If there's a valid token, render the protected content
  return children;
};

// Props validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
