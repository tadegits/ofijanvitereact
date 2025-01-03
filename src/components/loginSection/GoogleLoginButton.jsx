import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../Globals/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectRedirectUrl } from "../../features/userSlice";
import axios from 'axios';

function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState("");
  const redirectUrl = useSelector(selectRedirectUrl);
  const [password, setPassword] = useState("dummyPassword123");

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
    <div className="googlelogin">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const credentialResponseDecoded = jwtDecode(
              credentialResponse.credential
            );
            const { given_name, family_name, email } = credentialResponseDecoded;
            const dummyPhone = "1234567890";
            const dummyDept = "DD";
            const dummyPassword = "dummyPassword123";
            signUp(given_name, family_name, email, dummyPhone, dummyDept, dummyPassword);
            credentialResponseDecoded.dept_id = 1;
            credentialResponseDecoded.role_id = 1;
            //  localStorage.setItem('user', JSON.stringify(credentialResponseDecoded));
            
            try {
              console.log(email, password);
              const response = await axios.post(`${API_BASE_URL}/login`, { email, password: dummyPassword });
              console.log(response.data);
              if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch(
                  login({
                    email: email,
                    password: dummyPassword,
                    loggedIn: true,
                  })
                );   
                if (redirectUrl) {
                  navigate(redirectUrl); 
                } else {
                  navigate("/Exit_Exam");
                }
              } 
            } catch (error) {
              if (error.response && error.response.status === 422) {
                // Handle error
                console.error("Error:", error);
              }
            }
          } catch (error) {
            if (error.response && error.response.status === 422) {
              // setError("Incorrect username or password");
            }
          }
        }}
        onError={() => {
          console.log("login failed");
        }}
      />
    </div>
  );
}

export default GoogleLoginButton;
