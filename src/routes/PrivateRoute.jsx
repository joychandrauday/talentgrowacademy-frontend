import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { jwtDecode } from 'jwt-decode';  // Corrected import

const PrivateRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();

  // Check if authToken exists in local storage
  const authToken = localStorage.getItem('authToken'); // or use context if stored globally

  // Decode the token and check if email exists
  let userEmail = null;
  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken); // Decode the JWT token
      userEmail = decodedToken?.email; // Get the email from the token payload
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  console.log(userEmail);
  // Show loading spinner while authentication is in progress
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><span className="loading loading-dots loading-lg"></span></div>;
  }

  // If there's no email in the token, redirect to login
  if (!userEmail) {
    return <Navigate state={{ from: location }} to="/login" />;
  }

  // If there's an email, render the protected content
  return children;
};

// Props validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
