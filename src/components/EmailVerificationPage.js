import React from 'react';
import { Container, CssBaseline, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    // Logic to resend verification email (you can implement this in your AuthContext or here)
    alert('Verification email resent. Please check your inbox.');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Waiting for Email Verification
        </Typography>
        <Typography sx={{ mt: 2 }}>
          We have sent a verification email to your inbox. Please check your
          email and click the verification link to proceed.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleResendEmail}
        >
          Resend Email
        </Button>
        <Button variant="text" onClick={() => navigate('/login')}>
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default EmailVerificationPage;
