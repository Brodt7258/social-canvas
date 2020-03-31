import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
// firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return null;

  console.log({
    additionalData
  });

  // get a reference to the place in the db where a profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // fetch the document from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    console.log({
      displayName, email, photoURL, createdAt
    });
    console.log({
      additionalData
    });

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user:', error.message);
      return null;
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid).get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};

export default firebase;
