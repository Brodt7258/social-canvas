import React, { useState, useEffect, createContext } from 'react';
import Proptypes from 'prop-types';

import { auth, createUserProfileDocument } from '../firebase';
import { useLogOnChange } from '../hooks/misc';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useLogOnChange('AuthContext-currentUser:', currentUser);

  useEffect(() => {
    const unSubAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      setCurrentUser(user);
    });
    return unSubAuth;
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: Proptypes.node.isRequired
};

export default AuthProvider;
