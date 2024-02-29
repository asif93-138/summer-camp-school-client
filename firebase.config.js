// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJSpl3fFyTQFrBHuFc1fjdxW7_P76mQHk",
  authDomain: "summer-camp-school-403ef.firebaseapp.com",
  projectId: "summer-camp-school-403ef",
  storageBucket: "summer-camp-school-403ef.appspot.com",
  messagingSenderId: "665308133294",
  appId: "1:665308133294:web:23c5ba5a2f7f54ef867a3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;