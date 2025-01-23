import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Default from "./Layout/Default";
import Loged from "./Layout/Loged";
import Wrapper from "./components/wrapper/Wrapper";
import Footer from "./components/footer/footer";
import { selectUser } from "./features/userSlice";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Navbar from "./components/navbar/Navbar";
import FixedBottomComponent from "./components/Add/FixedBottomComponent";
import FloatingCommentButton from "./Globals/FloatingCommentButton";
import PayConfirmation from "./Globals/PayConfirmation";
import API_BASE_URL from "./Globals/apiConfig";

function App() {
  const [user, setUser] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      setUser(roleUser);
      console.log('users', roleUser.user.id)

      const checkPaymentStatus = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/check-payment-status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: roleUser.user.id }),
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setPaymentStatus(data.paymentStatus);
        } catch (error) {
          console.error("Failed to verify payment:", error.message);
        } finally {
          setLoading(false);
        }
      };

      checkPaymentStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyApf7vMHzF0F8XdCS-OdnA43GAk-BAItG0",
    authDomain: "ofijan-exams.firebaseapp.com",
    projectId: "ofijan-exams",
    storageBucket: "ofijan-exams.appspot.com",
    messagingSenderId: "291201379155",
    appId: "1:291201379155:web:ac8285c04bb09e6fc1cfa6",
    measurementId: "G-S09KVVNP50",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  if (loading) {
    return <p>Loading...</p>; // Show a loading spinner or placeholder while verifying payment
  }

  // if (isLoggedIn && paymentStatus !== "paid") {
  //   navigate("/member_payment")
  // }

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <Loged />
          <FloatingCommentButton />
          {/* <FixedBottomComponent /> */}
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <Default />
          <FloatingCommentButton />
          {/* <FixedBottomComponent /> */}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
