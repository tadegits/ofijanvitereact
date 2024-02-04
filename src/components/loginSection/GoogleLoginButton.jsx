// GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = '608370973698-jdvtf455mf89iojv7lfvvgof0ef1vsqq.apps.googleusercontent.com';

  const responseGoogle = (response) => {
    if (response.profileObj) {
      // Handle successful login
      onSuccess(response.profileObj);
    } else {
      // Handle unsuccessful login
      onFailure();
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
