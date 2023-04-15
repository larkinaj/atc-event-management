import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  InputAdornment,
  CardContent,
  Avatar,
  Box,
  Card,
} from "@mui/material";
import "./styles/profile-page.css";
import { BoltRounded, Search, Description } from "@mui/icons-material"; // default exports vs named exports
import readEventsRequest from "./api/readEventsRequest";
import dateConverter from "./helperFunction";
import deleteEventRequest from "./api/deleteEventRequest";
import Header from "./Header";

const ProfilePage = (props) => {
  const navigate = useNavigate();
  console.log("current user", props.currentUser);
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#003366",
        width: 150,
        height: 150,
        fontSize: "45px",
        margin: "15px",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const [events, updateEvents] = React.useState([]); // Raw events array
  const [eventsHosting, updateEventsHosting] = React.useState([]); // Raw events array
  const [eventsAttending, updateEventsAttending] = React.useState([]); // Raw events array

  useEffect(() => {
    readEventsRequest().then((data) => {
      data = data.sort((a, b) => {
        let dateA = new Date(a.date_time);
        let dateB = new Date(b.date_time);
        return dateA - dateB;
      });
      console.log(data);
      updateEvents(data);
      const eventsHostingData = data.reduce((acc, curr) => {
        if (curr.host_id === props.currentUser.user_id) {
          acc.push(curr);
        }
        return acc;
      }, []);
      updateEventsHosting(mappingCards(eventsHostingData, "hosting"));
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
      imageOfEvent: "",
    });
    navigate("/edit-event/" + event.event_id);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: files[0] }));
  };

  const handleUserInfoChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const deleteEventButton = (id) => {
    deleteEventRequest(id).then((data) => {
      console.log("data returned from delete", data);
      readEventsRequest().then((data) => {
        data = data.sort((a, b) => {
          let dateA = new Date(dateConverter(a.date_time));
          let dateB = new Date(dateConverter(b.date_time));
          return dateA - dateB;
        });
        updateEvents(data);
        const eventsHostingData = data.reduce((acc, curr) => {
          if (curr.host_id === props.currentUser.user_id) {
            acc.push(curr);
          }
          return acc;
        }, []);
        updateEventsHosting(mappingCards(eventsHostingData, "hosting"));
      });
    });
  };

  const mappingCards = (arrayOfData, typeOfEvents) => {
    if (typeOfEvents === "hosting") {
      return arrayOfData.map((event, i) => {
        return (
          <Grid item xs={12} sm={6} key={i}>
            <div className="cardWrapperProfile">
              <Card
                sx={{
                  borderColor: "rgba(119, 136, 153, 0.5)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                {/* #778899 with 50% opaqueness represented in rgba */}
                <React.Fragment>
                  <Box sx={{ height: 15, bgcolor: "#003366" }} />
                  <CardContent
                    className="eventCardContentProfile"
                    sx={{ minHeight: "150px" }}
                  >
                    <Typography
                      sx={{ fontSize: 14, margin: "0px" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {event.date_time}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "#000000" }}
                    >
                      {event.event_name}
                      {/* This should be a link that shows user more information about event */}
                    </Typography>
                    <Typography
                      sx={{ mb: 1, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {event.event_location} | {event.industry} |{" "}
                      {event.event_type}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                      {event.total_attendees} attendees
                    </Typography>
                    <Button
                      sx={{ marginTop: 1 }}
                      onClick={() => editEventButton(event)}
                    >
                      Edit Event
                    </Button>
                    <Button
                      sx={{ marginTop: 1 }}
                      onClick={() => deleteEventButton(event.event_id)}
                    >
                      Delete Event
                    </Button>
                  </CardContent>
                </React.Fragment>
              </Card>
            </div>
          </Grid>
        );
      });
    }
    if (typeOfEvents === "attended") {
      return arrayOfData.map((event, i) => {
        return (
          <Grid item xs={12} sm={6} key={event.event_name}>
            <div className="cardWrapperProfile">
              <Card
                sx={{
                  borderColor: "rgba(119, 136, 153, 0.5)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                {/* #778899 with 50% opaqueness represented in rgba */}
                <React.Fragment>
                  <Box sx={{ height: 15, bgcolor: "#003366" }} />
                  <CardContent
                    className="eventCardContentProfile"
                    sx={{ minHeight: "150px" }}
                  >
                    <Typography
                      sx={{ fontSize: 14, margin: "0px" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {event.date_time}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "#000000" }}
                    >
                      {event.event_name}
                      {/* This should be a link that shows user more information about event */}
                    </Typography>
                    <Typography
                      sx={{ mb: 1, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {event.event_location} | {event.industry} |{" "}
                      {event.event_type}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                      {event.total_attendees} attendees
                    </Typography>
                  </CardContent>
                </React.Fragment>
              </Card>
            </div>
          </Grid>
        );
      });
    }
  };

  return (
    <div>
      <Header currentUser={props.currentUser} />
      <div className="profile-page">
        <div className="user-info-column">
          <Avatar
            {...stringAvatar(
              props.currentUser.first_name + " " + props.currentUser.last_name
            )}
          />
          <div>
            <Typography variant="h6" gutterBottom>
              {props.currentUser.username} | {props.currentUser.first_name}{" "}
              {props.currentUser.last_name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {props.currentUser.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {props.currentUser.industry}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {props.currentUser.bio}
            </Typography>
          </div>
          <Button
            fullWidth
            variant="contained"
            component="label"
            margin="normal"
            className="custom-margin"
            sx={{
              width: "200px",
              backgroundColor: "#003366",
              "&:hover": { backgroundColor: "#00274d" },
            }}
            onClick={() => navigate("/edituserinfo")}
          >
            Edit User Info
          </Button>
          <Button
            fullWidth
            variant="contained"
            component="label"
            margin="normal"
            className="custom-margin"
            sx={{
              width: "200px",
              backgroundColor: "#003366",
              "&:hover": { backgroundColor: "#00274d" },
            }}
          >
            Upload Resume
            <Description sx={{ marginLeft: "5px", fontSize: "1rem" }} />
            <input
              type="file"
              hidden
              name="resume"
              onChange={handleFileChange}
            />
          </Button>
        </div>
        <div className="user-events-column">
          <div className="hosting">
            <Typography
              sx={{ fontSize: 20, marginTop: "1rem", marginBottom: "1rem" }}
              className="eventsHostingHeader"
              gutterBottom
            >
              Events I'm hosting
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              {eventsHosting}
            </Grid>
          </div>
          <div className="attending">
            <Typography
              sx={{ fontSize: 20, marginTop: "1rem", marginBottom: "1rem" }}
              className="eventsHostingHeader"
              gutterBottom
            >
              Events I'm attending
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              {eventsHosting}
            </Grid>
          </div>
          <div className="attended">
            <Typography
              sx={{ fontSize: 20, marginTop: "1rem", marginBottom: "1rem" }}
              className="eventsHostingHeader"
              gutterBottom
            >
              Events I attended
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              {eventsHosting}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
