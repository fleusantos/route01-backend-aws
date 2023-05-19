import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
// import './css/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  const goToMapButtonClick = () => {
    navigate('/map');
  };

  const [user, setUser] = useState(null);
    const [customState, setCustomState] = useState(null);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
        switch (event) {
            case "signIn":
            setUser(data);
            break;
            case "signOut":
            setUser(null);
            break;
            case "customOAuthState":
            setCustomState(data);
        }
        });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return (
    <div className="login-page">
      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
          <Grid item>
            {/* <img src="/path/to/logo.png" alt="Logo" className="logo" /> */}
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center" color="primary">
              Login
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" size="large" startIcon={<img src="./google_logo.png" width={"30px"} height={"30px"} alt="Google Icon" />} onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>
              Sign in with Google
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center" color="primary">
              Or
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" size="large" onClick={goToMapButtonClick}>
              Go to Map
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
