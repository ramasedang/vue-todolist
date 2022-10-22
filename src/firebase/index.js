import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyB44N4FJU2AcKDhNxogEAIzBsJU0ftSjyE',

  authDomain: 'todo-pweb.firebaseapp.com',

  projectId: 'todo-pweb',

  storageBucket: 'todo-pweb.appspot.com',

  messagingSenderId: '125640156625',

  appId: '1:125640156625:web:34c994023294d2e3502cf0',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };

export const getData = async () => {
  db.collection('activity')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
};
