import React from 'react';

import { signInWithGoogle, signOut } from '../firebase';

const SignIn = () => {
  return (
    <div>
      <h2>Sign In</h2>
      <button type="button" onClick={signInWithGoogle}>
        With Google
      </button>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default SignIn;
