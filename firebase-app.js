// Firebase configuration for your project
const firebaseConfig = {
  apiKey: "AIzaSyA7ni6-_f9RdfkNzgxLOnjSs_4mqx6UF0w",
  authDomain: "thegreatlockin-52959.firebaseapp.com",
  projectId: "thegreatlockin-52959",
  storageBucket: "thegreatlockin-52959.firebasestorage.app",
  messagingSenderId: "182993286746",
  appId: "1:182993286746:web:481aa971d71a25c26f0a63",
  measurementId: "G-7B9W9HW30Q"
};

// ⭐ INITIALISE FIREBASE
firebase.initializeApp(firebaseConfig);

// ⭐ CONNECT TO FIRESTORE
const db = firebase.firestore();
