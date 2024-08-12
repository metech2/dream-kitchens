import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { loading, user, isEmailVerfied } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (user) {
    console.log('User:', user);
    return children;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
