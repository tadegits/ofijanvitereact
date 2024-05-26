// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyApf7vMHzF0F8XdCS-OdnA43GAk-BAItG0",
  authDomain: "ofijan-exams.firebaseapp.com",
  projectId: "ofijan-exams",
  storageBucket: "ofijan-exams.appspot.com",
  messagingSenderId: "291201379155",
  appId: "1:291201379155:web:ac8285c04bb09e6fc1cfa6",
  measurementId: "G-S09KVVNP50"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };