import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../Globals/apiConfig';

function GoogleLoginButton() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState("");

  async function signUp(fname, lname, email, phone, dept, password) {
    let crinfo = { fname, lname, email, phone, dept, password };

    try {
      let result = await fetch(`${API_BASE_URL}/registeruser`, {
        method: "POST",
        body: JSON.stringify(crinfo),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      result = await result.json();

      if (result) {
        let respresult = result.message;
        let status = result.status;

        if (status === "success") {
          navigate("/Login", { state: { registered: { respresult } } });
        } else {
          setMessage(respresult);
          setRegistered("User not registered");
        }
      } else {
        setRegistered(checkuser);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const credentialResponseDecoded = jwtDecode(
          credentialResponse.credential
        );

        // Dummy data for sign up
        const { given_name, family_name, email } = credentialResponseDecoded;
        const dummyPhone = "1234567890";
        const dummyDept = "Dummy Department";
        const dummyPassword = "dummyPassword123";

        // Call signUp function with dummy data
        signUp(given_name, family_name, email, dummyPhone, dummyDept, dummyPassword);
         credentialResponseDecoded.dept_id = 1;
         credentialResponseDecoded.role_id = 1;
         localStorage.setItem('user', JSON.stringify(credentialResponseDecoded));
        navigate('/Exit_Exam');
        //  console.log(credentialResponseDecoded);
        //  const loggedInUser = localStorage.getItem('user');
        //  const users = JSON.parse(loggedInUser);
        //  console.log(users);
        window.location.reload();
      }}
      onError={() => {
        console.log("login failed");
      }}
    />
  );
}

export default GoogleLoginButton;
