import firebase from "firebase";
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAliPDR5SzuByX4B-6oH12GpeZeIIMruDs",
    authDomain: "meetups-b8329.firebaseapp.com",
    projectId: "meetups-b8329",
    storageBucket: "meetups-b8329.appspot.com",
    messagingSenderId: "938816018348",
    appId: "1:938816018348:web:918e83cf0cd6ee105d8c09",
    measurementId: "G-NQMXD9QZ0T"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();