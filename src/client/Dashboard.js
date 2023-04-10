import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IconButton, TextField, Box, InputAdornment, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import './styles/dashboard.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import { Search } from '@mui/icons-material';


const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    date: '',
    industry: '',
    eventType: '',
  });

  const searchEvents = (event) => {
    console.log(searchQuery)
    const newSearch = structuredClone(searchQuery)

  }

  const searchChange = (event) => {
    console.log('SEARCH CHANGE', event.target.value)
    const newSearch = structuredClone(searchQuery)
    newSearch.name = event.target.value
    setSearchQuery(newSearch);
  }

  const industryChange = (event) => {
    console.log('INDUSTRY CHANGE', event.target.value)
    const newSearch = structuredClone(searchQuery)
    newSearch.industry = event.target.value
    setSearchQuery(newSearch);
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
        <TextField
          id="search-bar"
          className="text"
          onChange={searchChange}
          variant="outlined"
          placeholder="Search..."
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={searchEvents} className="searchIcon" type="button" sx={{ p: '10px' }} aria-label="search">
                  <Search className="searchIcon" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Industry</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchQuery.industry}
            autoWidth label="Industry"
            onChange={industryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Information Technology'}>Information Technology</MenuItem>
            <MenuItem value={'Finance'}>Finance</MenuItem>
            <MenuItem value={'Healthcare'}>Healthcare</MenuItem>
            <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
            <MenuItem value={'Marketing'}>Marketing</MenuItem>
            <MenuItem value={'Food and Beverage'}>Food and Beverage</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default Dashboard