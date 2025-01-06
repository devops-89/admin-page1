import { TextField, InputAdornment, IconButton, Button, Box, Typography, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });


  const handleLogin = (values) => {
    console.log('Form submitted with values:', values);
  };

  return (
    <Container maxWidth={false} sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} id="login_bg">
      <Box maxWidth="xs" display="flex" flexDirection="column" justifyContent="center" alignItems="center" id="form_wrapper">
        <Box
          component="img"
          src={Logo}
          alt="Page 1 Travels"
          sx={{ marginBottom: '18px', height: 'auto' }}
        />
        <Typography variant="h5" sx={{ fontSize: { xs: '20px', sm: '26px' }, fontWeight: 500, color: 'var(--dark-color)', marginBottom: 2 }}>
          Page 1 Travels Login
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form noValidate sx={{ width: '100%' }}>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ marginBottom: 2 }}
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ marginBottom: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1,
                  fontSize: '16px',
                  mt: 3,
                  mb: 2,
                  backgroundColor: 'var(--orange-color)',
                  '&:hover': { backgroundColor: 'var(--blue-color)' },
                }}
              >
                Login Now
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
