import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button, TextField, Box, Link, Typography, Select, MenuItem, InputLabel } from '@mui/material'
import './styles/dashboard.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';


const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    date: '',
    industry: '',
    eventType: '',
  });

  const searchEvents = (event) => {
    event.preventDefault()
    const newSearch = structuredClone(searchQuery)
    setSearchQuery(newSearch.name = e.target.value);
    // Uncomment the code below once the backend team finishes the routes
    // fetch('http://localhost:3000/login', {
    //   method: 'POST', 
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(credentials)
    // })
    // .then((res)=>res.json())
    // .then((data) => {
    //   console.log(data)
    // })
  }

  const testEvent = {
    eventName: 'Codesmith Graduation Party',   
    eventDate: 'September 9, 2023',
    industry: 'Tech',
    eventType: 'Alumni gathering',
    location: 'NYC',
    numAttendees: 33,
  }

  return (
    <div className="dashboard">
      <div className="searchBar">
        <Box
          component="form"
          noValidate autoComplete="off"
          onSubmit={searchEvents}
        >
          <TextField
            id="search-bar"
            className="text"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <InputLabel id="demo-simple-select-label">Industry</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            placeholder="Search..."
            label="Industry"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Information Technology'}>Information Technology</MenuItem>
            <MenuItem value={'Finance'}>Finance</MenuItem>
            <MenuItem value={'Healthcare'}>Healthcare</MenuItem>
          </Select>
        </Box>
      </div>
    </div>
  )
}

export default Dashboard