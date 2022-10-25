import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB44N4FJU2AcKDhNxogEAIzBsJU0ftSjyE",
  authDomain: "todo-pweb.firebaseapp.com",
  projectId: "todo-pweb",
  storageBucket: "todo-pweb.appspot.com",
  messagingSenderId: "125640156625",
  appId: "1:125640156625:web:34c994023294d2e3502cf0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db};

export const getData = async function () {
  var data = [];
  await db
    .collection("activity")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push(doc.data());
      });
    });
  return data;
};

export const deleteCategory = async (id) => {
  await db
    .collection("activity")
    .where("category", "==", id)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
  await db
    .collection("task")
    .where("category", "==", id)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
};

export const deleteTask = async (id) => {
  await db
    .collection("task")
    .where("name", "==", id)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.ref.delete();
        console.log("delete task");
      });
    });
};

export const addTask = async (name, priority, category, status) => {
  await db.collection("task").add({
    name: name,
    priority: priority,
    category: category,
    status: status,
  });
  console.log("Task added");
};

export const getDataTask = async (category) => {
  var data = [];
  await db
    .collection("task")
    .where("category", "array-contains", category)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push(doc.data());
      });
    });
  return data;
};

export const updateCategory = async (oldName, newName) => {
  await db
    .collection("activity")
    .where("category", "==", oldName)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.ref.update({
          category: newName,
        });
      });
    });
  await db
    .collection("task")
    .where("category", "array-contains", oldName)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.ref.update({
          category: newName,
        });
      });
    });
};

