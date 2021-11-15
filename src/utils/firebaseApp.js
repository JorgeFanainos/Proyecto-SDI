import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxLMAbB69438nVPKPgnjtGzOLDbHwjvNE",
  authDomain: "proyecto-sdi-31cdf.firebaseapp.com",
  projectId: "proyecto-sdi-31cdf",
  storageBucket: "proyecto-sdi-31cdf.appspot.com",
  messagingSenderId: "732242616274",
  appId: "1:732242616274:web:b6f1ea139fd5a7fa03320b",
  measurementId: "G-Q0FH2VVKDR",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
