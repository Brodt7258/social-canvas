import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyACOZsxXwYbvTyl4jvG_nHXAMRFRYF0HSQ',
  authDomain: 'social-canvas-ba047.firebaseapp.com',
  databaseURL: 'https://social-canvas-ba047.firebaseio.com',
  projectId: 'social-canvas-ba047',
  storageBucket: 'social-canvas-ba047.appspot.com',
  messagingSenderId: '681257836019',
  appId: '1:681257836019:web:fff348e9db3684ad8c8686',
  measurementId: 'G-5BKNEL0NYW'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
