// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPRl2UWvwCCHKTvccscVfhPQL06OonFp4",
  authDomain: "fir-olx-853a2.firebaseapp.com",
  projectId: "fir-olx-853a2",
  storageBucket: "fir-olx-853a2.appspot.com",
  messagingSenderId: "235201614741",
  appId: "1:235201614741:web:689d2c7040ec212024dc9c"
};

// Initialize Firebase
export const Firebase = firebase.initializeApp(firebaseConfig);