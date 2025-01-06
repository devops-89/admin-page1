import { TextField, Button, Box, Typography, Container } from '@mui/material';
import React from 'react'
import Logo from '../assets/logo.png'

const Login = () => {
    const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <>
    <Container maxWidth="xs" sx={{'border' : '2px solid red'}}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <img src={Logo} alt='page 1 travels'/>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:'var(--orange-color)' }}
          >
            Login Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
        </>
    )
}

export default Login