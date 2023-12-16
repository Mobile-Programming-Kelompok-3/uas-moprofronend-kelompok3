import firebase from 'firebase';

const express = requires("express");
const app = express();
const cors = require("cors")
  app.use(
    cors({
      origin: "*",
    })
  );
firebase.initializeApp({
    apiKey: "AIzaSyDy_x0wD1HJdGBdMVa0bGeosOn_RhWj7hM",
    authDomain: "dlillahproject---crud.firebaseapp.com",
    projectId: "dlillahproject---crud",
    storageBucket: "dlillahproject---crud.appspot.com",
    messagingSenderId: "509760971777",
    appId: "1:509760971777:web:130e1cc041005858c4cc00"
})

const FIREBASE = firebase;

export default FIREBASE;