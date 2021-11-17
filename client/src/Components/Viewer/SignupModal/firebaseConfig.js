import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQy4aCXsVaeEWlgldXqDHGBa7RfkDafjU",
  authDomain: "bookburns-9de3f.firebaseapp.com",
  projectId: "bookburns-9de3f",
  storageBucket: "bookburns-9de3f.appspot.com",
  messagingSenderId: "600672668177",
  appId: "1:600672668177:web:bc311282f0aefeae19ffb0",
  measurementId: "G-JGP1X3CVQ8"
};


firebase.initializeApp(firebaseConfig);
export default firebase;
