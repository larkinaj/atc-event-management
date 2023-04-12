import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IconButton, Typography, InputAdornment, Select, Avatar, InputLabel, FormControl } from '@mui/material'
import './styles/profile-page.css';
import { Search } from '@mui/icons-material'; // default exports vs named exports


const ProfilePage = () => {
  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 150, height: 150,
        fontSize: '45px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }



  return (
    <div className="profile-page">
      <div className="user-info">
        <h1>profile</h1>
        <Avatar 
          {...stringAvatar('Andrew Larkin')}
        />
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
          quasi quidem quibusdam.
        </Typography>
      </div>
      <div className="user-event-info">
        <h1>profile events</h1>
      </div>
    </div>

  )
}

export default ProfilePage