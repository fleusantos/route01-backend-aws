import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
// import './css/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const goToMapButtonClick = () => {
    navigate('/map');
  };

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
            <Button variant="contained" color="primary" size="large" startIcon={<img src="./google_logo.png" width={"30px"} height={"30px"} alt="Google Icon" />}>
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
