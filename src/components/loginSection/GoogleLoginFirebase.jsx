import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
 import { GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
 import { app  } from '../../Globals/firebaseConfig'; 
const GoogleLoginFirebase = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(app, provider); // Use app instance
          // Handle successful login
          console.log('Logged in with Google:', result.user);
        } catch (error) {
          // Handle errors
          console.error('Error logging in with Google:', error);
        }
      };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </Button>
            </Grid>
        </Grid>
    );
};

export default GoogleLoginFirebase;
