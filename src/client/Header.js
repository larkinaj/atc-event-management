import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003366' }}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: '#ffffff', textDecoration: 'none' }}>
          CareerConnect
        </Typography>
        <Box>
          <Button component={RouterLink} to="/browse" sx={{ color: '#ffffff', textDecoration: 'none' }}>
            Browse Events
          </Button>
          <Button component={RouterLink} to="/create" sx={{ color: '#ffffff', textDecoration: 'none' }}>
            Create Event
          </Button>
          <Button component={RouterLink} to="/help" sx={{ color: '#ffffff', textDecoration: 'none' }}>
            Help
          </Button>
          <Button component={RouterLink} to="/signin" sx={{ backgroundColor: '#ffffff', color: '#003366', textDecoration: 'none', marginLeft: '16px' }}>
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
