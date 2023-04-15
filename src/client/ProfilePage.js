import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, InputAdornment, CardContent, Avatar, Box, Card } from '@mui/material'
import './styles/profile-page.css';
import { BoltRounded, Search, Description } from '@mui/icons-material'; // default exports vs named exports
import readEventsRequest from './api/readEventsRequest';
import deleteEventRequest from './api/deleteEventRequest';
import dateConverter from './helperFunction';

const ProfilePage = (props) => {
  const navigate = useNavigate();
  console.log('current user', props.currentUser)
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#003366',
        width: 150, height: 150,
        fontSize: '45px',
        margin: '15px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const [events, updateEvents] = React.useState([]); // Raw events array
  const [eventsHosting, updateEventsHosting] = React.useState([]); // Raw events array
  const [eventsAttending, updateEventsAttending] = React.useState([]); // Raw events array

  useEffect(() => {
    readEventsRequest().then((data) => {
      data = data.sort((a, b) => {
        let dateA = new Date(a.date_time)
        let dateB = new Date(b.date_time)
        return dateA - dateB
      })
      console.log(data);
      updateEvents(data);
      const eventsHostingData = data.reduce((acc, curr) => {
        if (curr.host_id === props.currentUser.user_id) {
          acc.push(curr);
        }
        return acc;
      }, []);
      updateEventsHosting(mappingCards(eventsHostingData, 'hosting'));
    });

  }, []);

  const editEventButton = (event) => {
    props.setEventDetails({
      nameOfEvent: event.event_name,
      industryOfEvent: event.industry,
      typeOfEvent: event.event_type,
      descriptionOfEvent: event.event_description,
      locationOfEvent: event.event_location,
      priceOfEvent: Number(event.event_price),
      imageOfEvent: '',
    })
    navigate("/edit-event/" + event.event_id)
  }

  const createEventButton = (event) => {
    props.setEventDetails({
      nameOfEvent: '',
      industryOfEvent: '',
      typeOfEvent: '',
      event_description: '',
      descriptionOfEvent: '',
      locationOfEvent: '',
      priceOfEvent: '',
      imageOfEvent: '',
    })
    navigate("/create-event")
  }


  const deleteEventButton = (id) => {
    deleteEventRequest(id).then((data)=>{
      console.log('data returned from delete', data);
      readEventsRequest().then((data) => {
        data = data.sort((a, b) => {
          let dateA = new Date(dateConverter(a.date_time))
          let dateB = new Date(dateConverter(b.date_time))
          return dateA - dateB
        })
        updateEvents(data);
        const eventsHostingData = data.reduce((acc, curr) => {
          if (curr.host_id === props.currentUser.user_id) {
            acc.push(curr);
          }
          return acc;
        }, []);
        updateEventsHosting(mappingCards(eventsHostingData, 'hosting'));
      })
    })
  }


  const mappingCards = (arrayOfData, typeOfEvents) => {
    if (typeOfEvents === 'hosting') {
      return arrayOfData.map((event, i) => {
        return (
          <div className="cardWrapperProfile" key={i}>
            <Card sx={{ borderColor: 'rgba(119, 136, 153, 0.5)', borderWidth: 1, borderStyle: 'solid' }}> {/* #778899 with 50% opaqueness represented in rgba */}
              <React.Fragment>
                <Box sx={{ height: 15, bgcolor: "#003366" }} />
                <CardContent className="eventCardContentProfile">
                  <Typography sx={{ fontSize: 14, margin: '0px' }} color="text.secondary" gutterBottom>
                    {event.date_time}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ color: '#000000' }}>
                    {event.event_name} {/* This should be a link that shows user more information about event */}
                  </Typography>
                  <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
                    {event.event_location} | {event.industry} | {event.event_type}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    {event.total_attendees} attendees
                  </Typography>
                  <Button onClick={()=>editEventButton(event)}>Edit Event</Button>
                  <Button onClick={()=>deleteEventButton(event.event_id)}>Delete Event</Button>
                </CardContent>
              </React.Fragment>
            </Card>
          </div>
        );
      })
    }
    if (typeOfEvents === 'attended') {
      return arrayOfData.map((event, i) => {
        return (
          <div className="cardWrapperProfile" key={i}>
            <Card sx={{ borderColor: 'rgba(119, 136, 153, 0.5)', borderWidth: 1, borderStyle: 'solid' }}> {/* #778899 with 50% opaqueness represented in rgba */}
              <React.Fragment>
                <Box sx={{ height: 15, bgcolor: "#003366" }} />
                <CardContent className="eventCardContentProfile">
                  <Typography sx={{ fontSize: 14, margin: '0px' }} color="text.secondary" gutterBottom>
                    {event.date_time}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ color: '#000000' }}>
                    {event.event_name} {/* This should be a link that shows user more information about event */}
                  </Typography>
                  <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
                    {event.event_location} | {event.industry} | {event.event_type}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    {event.total_attendees} attendees
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </div>
        );
      })
    }
  }

  return (
    <div className="profile-page">
      <div className="user-info-column">
        <Avatar
          {...stringAvatar(props.currentUser.first_name + " " + props.currentUser.last_name)}
        />
        <Typography variant="h6" gutterBottom>
          {props.currentUser.username} | {props.currentUser.first_name} {props.currentUser.last_name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {props.currentUser.email}
        </Typography>
        <Button>Edit User Info</Button>
        <Button onClick={createEventButton}>Create Event</Button>
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
          {eventsHosting}
        </div>
        <div>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', margin: '10px' }} className="eventsHostingHeader" gutterBottom>
            Events I'm attending
          </Typography>
          {eventsHosting}
        </div>
        <div>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', margin: '10px' }} className="eventsHostingHeader" gutterBottom>
            Events I attended
          </Typography>
          {eventsHosting}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage