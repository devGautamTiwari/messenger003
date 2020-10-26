import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCTv7FqmKY-QINDEZAG6DGnkaa5Ogez5jw",
  authDomain: "facebook-messenger-clone003.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone003.firebaseio.com",
  projectId: "facebook-messenger-clone003",
  storageBucket: "facebook-messenger-clone003.appspot.com",
  messagingSenderId: "909233179673",
  appId: "1:909233179673:web:982d53f0f8655fb0d2ae88",
  measurementId: "G-PF6LFTE8H0",
});

export const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export default db;
