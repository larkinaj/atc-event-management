import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button, Typography, InputAdornment, CardContent, Avatar, Box, Card } from '@mui/material'
import './styles/profile-page.css';
import { BoltRounded, Search, Description } from '@mui/icons-material'; // default exports vs named exports
import readEventsRequest from './api/readEventsRequest';

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
        fontSize: '45px',
        margin: '15px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const [eventsHosting, updateEventsHosting] = React.useState([]); // Raw events array

  useEffect(() => {
    readEventsRequest().then((data)=>{
      console.log(data);
      data = mapEvents(data);
      updateEventsHosting(data)
    });
  }, []);


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
  ]

  const eventCards = testEvents.map((event) => {
    if (event)
    return (
      <div className="cardWrapperProfile">
        <Card sx={{ borderColor: 'rgba(119, 136, 153, 0.5)', borderWidth: 1, borderStyle: 'solid' }}> {/* #778899 with 50% opaqueness represented in rgba */}
          <React.Fragment>
            <Box sx={{ height: 15, bgcolor: "#003366" }} />
            <CardContent className="eventCardContentProfile">
              <Typography sx={{ fontSize: 14, margin: '0px' }} color="text.secondary" gutterBottom>
                {event.eventDate}
              </Typography>
              <Typography variant="h6" component="div" sx={{ color: '#000000' }}>
                {event.eventName} {/* This should be a link that shows user more information about event */}
              </Typography>
              <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
                {event.location} | {event.industry} | {event.eventType}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {event.numAttendees} attendees
              </Typography>
              <Button>Edit Event</Button>
            </CardContent>
          </React.Fragment>
        </Card>
      </div>
    );
  });

  return (
    <div className="profile-page">
      <div className="user-info-column">
        <Avatar
          {...stringAvatar('Andrew Larkin')}
        />
        <Typography variant="h6" gutterBottom>
          Larkinaj | Andrew Larkin
        </Typography>
        <Typography variant="h6" gutterBottom>
          larkin.aj@gmail.com
        </Typography>
        <Button>Edit User Info</Button>
        <Button>Create Event</Button>
        <Button>
          Upload resume
          <Description/>
        </Button>
      </div>
      <div className="user-events-column">
        <div >
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', margin: '10px' }} className="eventsHostingHeader" gutterBottom>
            Events I'm hosting
          </Typography>
          {eventCards}
        </div>
        <div>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', margin: '10px' }} className="eventsHostingHeader" gutterBottom>
            Events I'm attending
          </Typography>
          {eventCards}
        </div>
        <div>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', margin: '10px' }} className="eventsHostingHeader" gutterBottom>
            Events I attended
          </Typography>
          {eventCards}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage