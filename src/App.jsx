import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import Default from "./Layout/Default";
import Loged from "./Layout/Loged";
import Wrapper from "./components/wrapper/Wrapper";
import Footer from './components/footer/footer';
import { selectUser } from "./features/userSlice";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [user, setUser] = useState(""); 
  const isLoggedIn = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      setUser(roleUser);
    }
  }, []);

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

  return (
    <>
      {isLoggedIn ? (
        <>
        <Navbar/>
          <Loged />
        </>
      ) : (
        <>
          
        <Navbar/>
          <Default />
   
        </>
      )}
    </>
  );
}

export default App;
