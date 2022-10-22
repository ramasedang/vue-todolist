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
  var data = [];
  await db
    .collection('activity')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push(doc.data());
      });
    });
  return data;
};

export const deleteCategory = async (id) => {
  db.collection('activity')
    .where('category', '==', id)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
};

export const addTask = async (name, priority, category, status) => {
  db.collection('task').add({
    name: name,
    priority: priority,
    category: category,
    status: status,
  });
  console.log('Task added');
};

export const getDataTask = async (category) => {
  var data = [];
  await db
    .collection('task')
    .where('category', '==', category)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push(doc.data());
      });
    });
  return data;
};
