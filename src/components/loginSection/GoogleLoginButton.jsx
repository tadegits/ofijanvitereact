// GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const navigate = useNavigate();
  const clientId = '608370973698-jdvtf455mf89iojv7lfvvgof0ef1vsqq.apps.googleusercontent.com';

  const responseGoogle = (response) => {
    if (response.profileObj) {
      localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/Exit_Exam');
                window.location.reload();
      onSuccess(response.profileObj);
    } else {
      console.log('failed', response.profileObj);
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
