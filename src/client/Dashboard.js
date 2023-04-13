import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IconButton, TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import './styles/dashboard.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import { Search } from '@mui/icons-material'; // default exports vs named exports
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import readEventsRequest from './api/readEventsRequest';

const Dashboard = () => {
  
  const [events, updateEvents] = React.useState([]); // Raw events array
  const [eventCards, updateEventCards] = React.useState([]); // Array of event cards

  useEffect(() => {
    readEventsRequest().then((data)=>{
      console.log(data)
      updateEvents(data);
      data = mapEvents(data);
      updateEventCards(data)
    });
  }, []);

  // Helper function for creating an array of event cards from the raw events array
  const mapEvents = (eventsArray) => {
    return eventsArray.map((event) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={event.event_name}>
          <div className="cardWrapper">
            <Card sx={{ borderColor: 'rgba(119, 136, 153, 0.5)', borderWidth: 1, borderStyle: 'solid' }}> {/* #778899 with 50% opaqueness represented in rgba */}
              <React.Fragment>
                <Box sx={{ height: 20, bgcolor: "#003366" }} />
                <CardContent className="eventCardContent">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {event.date_time}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: '#000000' }}>
                    {event.event_name} {/* This should be a link that shows user more information about event */}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {event.event_location} | {event.industry} | {event.event_type}
                  </Typography>
                  <Typography variant="body2">
                    {event.total_attendees} attendees
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Register</Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </div>
        </Grid>
      );
    });
  };

  // Filter by search value ==================
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    date: [dayjs('2022-04-17'), dayjs('2022-04-21')],
    industry: '',
    eventType: '',
  });
  
  const searchEvents = (event) => {
    console.log(searchQuery);
  }

  const searchChange = (event) => {
    console.log('SEARCH CHANGE', event.target.value)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.name = event.target.value
    setSearchQuery(searchCopy);
  }

  // Filter by date range ==================
  const dateChange = (event) => {
    console.log('DATE CHANGE', event)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.date = event
    setSearchQuery(searchCopy);
  }

  // Filter by industry ==================
  const industryChange = (event) => {
    console.log('INDUSTRY CHANGE', event.target.value)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.industry = event.target.value
    searchCopy.date = [dayjs('2022-04-17'), dayjs('2022-04-21')]
    setSearchQuery(searchCopy);  
    const filteredEvents = events.reduce((acc, curr) => {
      if (curr.industry === event.target.value || event.target.value ==='') {
        acc.push(curr);
      }
      return acc;
    }, []);
    const filteredEventCards = mapEvents(filteredEvents);
    updateEventCards(filteredEventCards);
  }

  // Filter by event type ==================
  const eventTypeChange = (event) => {
    console.log('EVENT TYPE CHANGE', event.target.value)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.eventType = event.target.value
    searchCopy.date = [dayjs('2022-04-17'), dayjs('2022-04-21')]
    setSearchQuery(searchCopy);
  }

  return (
    <div className="dashboard">
      <div className="queryBar">
        <div className="search-items">
          <TextField
            id="search-bar"
            className="search-items"
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
        </div>
        <div className="search-items">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              className="search-date"
              localeText={{ start: 'Start Date', end: 'End Date' }}
              value={searchQuery.date}
              onChange={dateChange}
              slots={{ field: SingleInputDateRangeField }}
              label="Pick a date"
            />
          </LocalizationProvider>
        </div>
        <FormControl>
          <InputLabel className="search-items" id="industry-search-label">Industry</InputLabel>
          <Select
            labelId="industry-search-label"
            className="searchEventDropdown search-items"
            value={searchQuery.industry}
            // autoWidth label="Industry"
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
        <FormControl>
          <InputLabel className="search-items" id="eventtype-search-label">Event Type</InputLabel>
          <Select
            labelId="eventtype-search-label"
            className="searchEventDropdown search-items"
            value={searchQuery.eventType}
            onChange={eventTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Alumni Gathering'}>Alumni Gathering</MenuItem>
            <MenuItem value={'Career Fair'}>Career Fair</MenuItem>
            <MenuItem value={'Networking Meetup'}>Networking Meetup</MenuItem>
            <MenuItem value={'Informational Interview'}>Informational Interview</MenuItem>
            <MenuItem value={'Conference'}>Conference</MenuItem>
            <MenuItem value={'Webinar/Workshop'}>Webinar/Workshop</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="eventCardsWrapper">
          <Grid container spacing={2}>
            {eventCards}
          </Grid>
      </div>
    </div>
  )
}

export default Dashboard