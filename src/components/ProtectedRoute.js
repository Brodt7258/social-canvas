import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { AuthContext } from '../providers/AuthProvider';


const ProtectedRoute = ({ children, ...rest }) => {
  const currentUser = useContext(AuthContext);

  return (
    <Route {...rest}>
      {!currentUser
        ? <Redirect to="/login" />
        : children}
    </Route>
  );
};

ProtectedRoute.propTypes = {
  children: Proptypes.node.isRequired
};

export default ProtectedRoute;
