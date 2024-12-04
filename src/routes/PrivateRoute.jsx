import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Accepts any renderable node
};

export default PrivateRoute;
