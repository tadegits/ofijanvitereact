import React from 'react'
import { GoogleLogin } from "@react-oauth/google";
function GoogleLoginButton() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) =>{
        console.log(credentialResponse);
      }}
      onError={() =>{
        console.log("login failed");
      }}
    />
  )
}

export default GoogleLoginButton
