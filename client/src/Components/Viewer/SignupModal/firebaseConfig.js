import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaYqQWra4SxRl1sd19CAPGeF3Q5IN1XQk",
  authDomain: "obosor-15adc.firebaseapp.com",
  projectId: "obosor-15adc",
  storageBucket: "obosor-15adc.appspot.com",
  messagingSenderId: "797371677094",
  appId: "1:797371677094:web:f402b7fa7de875db66b767",
  measurementId: "G-42D131PSYE",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
