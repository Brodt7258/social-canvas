import React, { useState, useEffect } from 'react';
import './App.css';

import { firestore, auth, createUserProfileDocument } from './firebase';

import SignIn from './components/SignIn';
import { useLogOnChange } from './hooks/misc';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useLogOnChange('currentUser', currentUser);

  useEffect(() => {
    const unSubPosts = firestore.collection('posts').onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((e) => ({ id: e.id, ...e.data() }));
      console.log({ posts });
    });

    return unSubPosts;
  }, []);

  useEffect(() => {
    const unSubAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      setCurrentUser(user);
    });

    return unSubAuth;
  }, []);

  return (
    <div className="App">
      <SignIn />
      <h2>App</h2>
    </div>
  );
}

export default App;
