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

const Dashboard = () => {

  const testEvents = [
    {
      eventName: 'Codesmith Graduation Party',
      eventDate: 'September 9, 2023',
      industry: 'Information Technology',
      eventType: 'Alumni Gathering',
      location: 'NYC',
      numAttendees: 32,
    },
    {
      eventName: 'Burger Conference',
      eventDate: 'April 20, 2023',
      industry: 'Food and Beverage',
      eventType: 'Career Fair',
      location: 'San Fransisco',
      numAttendees: 237,
    },
    {
      eventName: 'Healthcare Summit',
      eventDate: 'June 15, 2023',
      industry: 'Healthcare',
      eventType: 'Conference',
      location: 'Chicago',
      numAttendees: 500,
    },
    {
      eventName: 'Marketing Workshop',
      eventDate: 'August 4, 2023',
      industry: 'Marketing',
      eventType: 'Webinar/Workshop',
      location: 'Los Angeles',
      numAttendees: 120,
    },
    {
      eventName: 'AI & Machine Learning Expo',
      eventDate: 'October 25, 2023',
      industry: 'Information Technology',
      eventType: 'Conference',
      location: 'Seattle',
      numAttendees: 350,
    },
    {
      eventName: 'Green Energy Symposium',
      eventDate: 'November 8, 2023',
      industry: 'Information Technology',
      eventType: 'Conference',
      location: 'Austin',
      numAttendees: 250,
    },
    {
      eventName: 'Entertainment Industry Mixer',
      eventDate: 'December 1, 2023',
      industry: 'Entertainment',
      eventType: 'Networking Meetup',
      location: 'Los Angeles',
      numAttendees: 200,
    },
    {
      eventName: 'Financial Planning Workshop',
      eventDate: 'January 12, 2024',
      industry: 'Finance',
      eventType: 'Webinar/Workshop',
      location: 'Boston',
      numAttendees: 80,
    },
    {
      eventName: 'Fashion Forward Expo',
      eventDate: 'February 18, 2024',
      industry: 'Entertainment',
      eventType: 'Conference',
      location: 'Paris',
      numAttendees: 300,
      },
      {
      eventName: 'Startup Pitch Night',
      eventDate: 'May 30, 2023',
      industry: 'Information Technology',
      eventType: 'Networking Meetup',
      location: 'San Francisco',
      numAttendees: 150,
      },
      {
      eventName: 'Digital Marketing Trends Summit',
      eventDate: 'July 23, 2023',
      industry: 'Marketing',
      eventType: 'Conference',
      location: 'London',
      numAttendees: 400,
      },
      {
      eventName: 'Gaming Convention',
      eventDate: 'September 15, 2023',
      industry: 'Entertainment',
      eventType: 'Exhibition',
      location: 'Tokyo',
      numAttendees: 1000,
      },
      {
      eventName: 'FoodTech Conference',
      eventDate: 'October 12, 2023',
      industry: 'Food and Beverage',
      eventType: 'Conference',
      location: 'Berlin',
      numAttendees: 200,
      },
      {
      eventName: 'LegalTech Summit',
      eventDate: 'November 17, 2023',
      industry: 'Legal',
      eventType: 'Conference',
      location: 'Washington DC',
      numAttendees: 250,
      },
  ];

  const [searchQuery, setSearchQuery] = useState({
    name: '',
    date: [dayjs('2022-04-17'), dayjs('2022-04-21')],
    industry: '',
    eventType: '',
  });
  const [eventCardsInfo, setEventCardsInfo] = useState([]);

  const searchEvents = (event) => {
    console.log(searchQuery)

  }

  const searchChange = (event) => {
    console.log('SEARCH CHANGE', event.target.value)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.name = event.target.value
    setSearchQuery(searchCopy);
  }

  const dateChange = (event) => {
    console.log('DATE CHANGE', event)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.date = event
    setSearchQuery(searchCopy);
  }

  const industryChange = (event) => {
    console.log('INDUSTRY CHANGE', event.target.value)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.industry = event.target.value
    searchCopy.date = [dayjs('2022-04-17'), dayjs('2022-04-21')]
    setSearchQuery(searchCopy);
    const eventCards = testEvents.map((el) => {
      if (el.industry === event.target.value || event.target.value ==='') {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={el.eventName}>
            <div className="cardWrapper">
              <Card sx={{ borderColor: 'rgba(119, 136, 153, 0.5)', borderWidth: 1, borderStyle: 'solid' }}> {/* #778899 with 50% opaqueness represented in rgba */}
                <React.Fragment>
                  <Box sx={{ height: 20, bgcolor: "#003366" }} />
                  <CardContent className="eventCardContent">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {el.eventDate}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ color: '#000000' }}>
                      {el.eventName} {/* This should be a link that shows user more information about event */}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {el.location} | {el.industry} | {el.eventType}
                    </Typography>
                    <Typography variant="body2">
                      {el.numAttendees} attendees
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">RSVP</Button>
                  </CardActions>
                </React.Fragment>
              </Card>
            </div>
          </Grid>
        );
      }
    });
    setEventCardsInfo(eventCards)
  }

  const eventTypeChange = (event) => {
    console.log('EVENT TYPE CHANGE', event.target.value)
    const searchCopy = structuredClone(searchQuery)
    searchCopy.eventType = event.target.value
    searchCopy.date = [dayjs('2022-04-17'), dayjs('2022-04-21')]
    setSearchQuery(searchCopy);
  }



  const eventCards = testEvents.map((event) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={event.eventName}>
        <div className="cardWrapper">
          <Card sx={{ borderColor: 'rgba(119, 136, 153, 0.5)', borderWidth: 1, borderStyle: 'solid' }}> {/* #778899 with 50% opaqueness represented in rgba */}
            <React.Fragment>
              <Box sx={{ height: 20, bgcolor: "#003366" }} />
              <CardContent className="eventCardContent">
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {event.eventDate}
                </Typography>
                <Typography variant="h5" component="div" sx={{ color: '#000000' }}>
                  {event.eventName} {/* This should be a link that shows user more information about event */}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {event.location} | {event.industry} | {event.eventType}
                </Typography>
                <Typography variant="body2">
                  {event.numAttendees} attendees
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">RSVP</Button>
              </CardActions>
            </React.Fragment>
          </Card>
        </div>
      </Grid>
    );
  });

  useEffect(() => {
    setEventCardsInfo(eventCards)
  }, [])


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
            {eventCardsInfo}
          </Grid>
      </div>
    </div>
  )
}

export default Dashboard