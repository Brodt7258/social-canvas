import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { firestore } from './firebase';

import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    const unSubPosts = firestore.collection('posts').onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((e) => ({ id: e.id, ...e.data() }));
      console.log({ posts });
    });

    return unSubPosts;
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <h2>App</h2>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute path="/">
            <h2>Protected Info</h2>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
