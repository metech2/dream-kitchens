import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Typography, Button, Avatar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[100]),
  backgroundColor: pink[200],
  '&:hover': {
    backgroundColor: pink[500],
  },
}));

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Avatar
          alt={user?.name}
          src={user?.profilePicture}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          {user?.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {user?.email}
        </Typography>
        <ColorButton
          variant="contained"
          size="large"
          onClick={logOut}
          sx={{ mt: 3 }}
        >
          Sign Out
        </ColorButton>
      </Box>
    </Container>
  );
};

export default Profile;
