import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  console.log(user);
  const location = useLocation()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><span className="loading loading-dots loading-lg"></span></div>
  }
  if (user) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to={'/login'}></Navigate>
  );
};

//props validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


export default PrivateRoute;
