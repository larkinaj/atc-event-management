import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './styles/header.css';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003366' }}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: '#ffffff', textDecoration: 'none' }}>
          CareerConnect
        </Typography>
        <Box>
          <Button component={RouterLink} to="/create" sx={{ color: '#ffffff', textDecoration: 'none' }}>
            Create Event
          </Button>
          <Button component={RouterLink} to="/help" sx={{ color: '#ffffff', textDecoration: 'none' }}>
            Help
          </Button>
          <Button component={RouterLink} to="/" sx={{ backgroundColor: '#ffffff', color: '#FF7F50', textDecoration: 'none', marginLeft: '16px' }}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
