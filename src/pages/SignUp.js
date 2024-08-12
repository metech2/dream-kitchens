import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { updateProfile, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Copyright from '../components/Copyright';
import EmailVerificationPage from '../components/EmailVerificationPage';

const SignUp = () => {
  const { createUser, user, loading } = useContext(AuthContext);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
    );
  }

  if (emailVerificationSent) {
    return <EmailVerificationPage />;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
        }).then(() => {
          sendEmailVerification(result.user)
            .then(() => {
              alert('Verification email sent. Please check your inbox.');
              setEmailVerificationSent(true);
            })
            .catch((error) => {
              console.log('Error sending verification email:', error);
            });
        });

        // Add user data to Firebase Realtime Database
        const db = getDatabase();
        set(ref(db, 'users/' + result.user.uid), {
          uid: result.user.uid,
          username: name,
          email: email,
        });

        // Poll for email verification
        const checkEmailVerified = setInterval(() => {
          result.user.reload().then(() => {
            if (result.user.emailVerified) {
              clearInterval(checkEmailVerified);
              navigate('/');
            }
          });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setSelectedImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default SignUp;
