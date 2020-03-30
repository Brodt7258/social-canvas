import React, { useEffect } from 'react';
import './App.css';

import { firestore, auth } from './firebase';

import SignIn from './components/SignIn';

function App() {
  useEffect(() => {
    const unSubPosts = firestore.collection('posts').onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((e) => ({ id: e.id, ...e.data() }));
      console.log({ posts });
    });

    return unSubPosts;
  }, []);

  useEffect(() => {
    const unSubAuth = auth.onAuthStateChanged((user) => {
      console.log({ user });
    });

    return unSubAuth;
  }, []);

  return (
    <div className="App">
      <SignIn />
      App
    </div>
  );
}

export default App;
