import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyBxLMAbB69438nVPKPgnjtGzOLDbHwjvNE",
    authDomain: "proyecto-sdi-31cdf.firebaseapp.com",
    projectId: "proyecto-sdi-31cdf",
    storageBucket: "proyecto-sdi-31cdf.appspot.com",
    messagingSenderId: "732242616274",
    appId: "1:732242616274:web:b6f1ea139fd5a7fa03320b",
    measurementId: "G-Q0FH2VVKDR"
  };

const firebaseApp = initializeApp(firebaseConfig);


export default firebaseApp
