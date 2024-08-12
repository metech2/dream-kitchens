import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const links = [
    {
      name: 'Home',
      path: '/',
      icon: faHome,
    },
    {
      name: 'Recipes',
      path: '/recipes',
      icon: faList,
    },
  ];

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List
        sx={{
          width: 250,
          backgroundColor: '#FFFFFF',
          height: '100%',
          color: '#F36C99',
        }}
      >
        {links.map((link) => (
          <ListItem
            button
            component={Link}
            to={link.path}
            key={link.name}
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
        <ListItem
          button
          component={Link}
          to="/profile"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/manage-recipes"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="My Recipes" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#FFFFFF', zIndex: '999' }}
    >
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: '#F36C99' }} />
            </IconButton>
            {drawer}
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: '#F36C99' }}
            >
              <Link
                to="/"
                className="logo"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                D<span>ream</span>Kitchens
              </Link>
            </Typography>
            <div className="nav-links">
              {links.map((link) => (
                <Button
                  color="inherit"
                  component={Link}
                  to={link.path}
                  key={link.name}
                  className={location.pathname === link.path ? 'active' : ''}
                  sx={{
                    color: '#F36C99',
                    '&.active': {
                      borderBottom: '2px solid #F36C99',
                    },
                  }}
                >
                  {link.name}
                </Button>
              ))}
              <Button
                color="inherit"
                component={Link}
                className="active"
                id="profile-button"
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: '#F36C99' }}
              >
                Profile
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'profile-button',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: '#FFFFFF',
                    color: '#F36C99',
                    zIndex: '1000',
                  },
                }}
              >
                <MenuItem
                  color="inherit"
                  component={Link}
                  className="active"
                  to="/profile"
                  key="Profile"
                  onClick={handleClose}
                  sx={{ color: '#F36C99' }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  color="inherit"
                  component={Link}
                  className="active"
                  to="/manage-recipes"
                  key="Manage Recipes"
                  onClick={handleClose}
                  sx={{ color: '#F36C99' }}
                >
                  My Recipes
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
