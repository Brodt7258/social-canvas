import React, { useState } from 'react';

import { useLogOnChange } from '../hooks/misc';

import {
  auth, signInWithGoogle, signOut, createUserProfileDocument
} from '../firebase';

const SignIn = () => {
  const [signinData, setSigninData] = useState({});
  useLogOnChange('signinData', signinData);

  const [signupData, setSignupData] = useState({});
  useLogOnChange('signupData', signupData);

  const handleSigninChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async () => {
    try {
      const { email, password, displayName } = signupData;
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign In Component</h2>
      <form>
        <h3>Have an Account</h3>
        <input type="text" name="email" onChange={handleSigninChange} />
        <input type="password" name="password" onChange={handleSigninChange} />
      </form>
      <form>
        <h3>Make an Account</h3>
        <input type="text" name="displayName" onChange={handleSignupChange} />
        <input type="text" name="email" onChange={handleSignupChange} />
        <input type="password" name="password" onChange={handleSignupChange} />
      </form>
      <button type="submit">
        Sign In
      </button>
      <button type="submit" onClick={handleSignUp}>
        Sign Up
      </button>

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
