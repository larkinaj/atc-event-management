import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./styles/dashboard.css";
import { Search } from "@mui/icons-material"; // default exports vs named exports
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dateConverter from "./helperFunction";

import readEventsRequest from "./api/readEventsRequest";

import Header from "./Header";

import testEvents from "./testEvent";

const Dashboard = (props) => {
  console.log('current user', props.currentUser)
  const [events, updateEvents] = React.useState([]); // Raw events array
  const [eventCards, updateEventCards] = React.useState([]); // Array of event cards

  useEffect(() => {
    readEventsRequest().then((data) => {
      data = data.sort((a, b) => {
        let dateA = new Date(a.date_time)
        let dateB = new Date(b.date_time)
        return dateA - dateB
      })
      console.log(data);
      updateEvents(data);
      data = mapEvents(data);
      updateEventCards(data);
    });
  }, []);

  // Helper function for creating an array of event cards from the raw events array
  const mapEvents = (eventsArray) => {
    return eventsArray.map((event, i) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <div>
            <Card
              sx={{
                borderColor: "rgba(119, 136, 153, 0.5)",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              {" "}
              {/* #778899 with 50% opaqueness represented in rgba */}
              <React.Fragment>
                <Box
                  sx={{
                    height: 20,
                    bgcolor: "#003366",
                    wordWrap: "break-word",
                  }}
                />
                <CardContent
                  className="eventCardContent"
                  sz={{ wordWrap: "break-word" }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    sz={{ wordWrap: "break-word" }}
                  >
                    {event.date_time}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: "#000000",
                      wordWrap: "break-word",
                    }}
                  >
                    {event.event_name}{" "}
                    {/* This should be a link that shows user more information about event */}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 14, wordWrap: "break-word" }}
                    color="text.secondary"
                  >
                    {event.event_location} | {event.industry} |{" "}
                    {event.event_type}
                  </Typography>
                  <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
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
    name: "",
    industry: "",
    eventType: "",
  });
  const [searchDate, setSearchDate] = useState([dayjs(), dayjs()]);

  const searchEvents = (event) => {
    console.log(searchQuery);
    console.log(searchDate);
    let filteredEvents = events.reduce((acc, curr) => {
      if (
        curr.industry === searchQuery.industry ||
        searchQuery.industry === ""
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);
    filteredEvents = filteredEvents.reduce((acc, curr) => {
      if (
        curr.event_type === searchQuery.eventType ||
        searchQuery.eventType === ""
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);
    filteredEvents = filteredEvents.reduce((acc, curr) => {
      if (
        curr.event_name
          .toLowerCase()
          .includes(searchQuery.name.toLowerCase()) ||
        searchQuery.name === ""
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);
    filteredEvents = filteredEvents.sort((a, b) => {
      let dateA = new Date(dateConverter(a.date_time));
      let dateB = new Date(dateConverter(b.date_time));
      return dateA - dateB;
    });
    const filteredEventCards = mapEvents(filteredEvents);
    updateEventCards(filteredEventCards);
  };

  const searchChange = (event) => {
    console.log("SEARCH CHANGE", event.target.value);
    const searchCopy = structuredClone(searchQuery);
    searchCopy.name = event.target.value;
    setSearchQuery(searchCopy);
  };

  // Filter by date range ==================
  const dateChange = (event) => {
    console.log("DATE CHANGE", event[0].$d);
    console.log("DATE CHANGE", event);
    setSearchDate(event);
  };

  // Filter by industry ==================
  const industryChange = (event) => {
    console.log("INDUSTRY CHANGE", event.target.value);
    const searchCopy = structuredClone(searchQuery);
    searchCopy.industry = event.target.value;
    setSearchQuery(searchCopy);
  };

  // Filter by event type ==================
  const eventTypeChange = (event) => {
    console.log("EVENT TYPE CHANGE", event.target.value);
    const searchCopy = structuredClone(searchQuery);
    searchCopy.eventType = event.target.value;
    setSearchQuery(searchCopy);
  };

  return (
    <div>
      <Header />
      <div className="dashboard">
        <Grid container className="queryBar" spacing={2}>
          <Grid item className="search-items">
            <TextField
              id="search-bar"
              className="search-items"
              onChange={searchChange}
              variant="outlined"
              placeholder="Search..."
              size="small"
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton
              //         onClick={searchEvents}
              //         className="searchIcon"
              //         type="button"
              //         sx={{ p: "10px" }}
              //         aria-label="search"
              //       >
              //         <Search className="searchIcon" />
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            />
          </Grid>
          <Grid item className="search-items">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                className="search-date"
                localeText={{ start: "Start Date", end: "End Date" }}
                value={searchDate}
                onChange={dateChange}
                slots={{ field: SingleInputDateRangeField }}
                label="Pick a date"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item className="search-items">
            <FormControl>
              <InputLabel id="industry-search-label">Industry</InputLabel>
              <Select
                labelId="industry-search-label"
                className="searchEventDropdown"
                value={searchQuery.industry}
                onChange={industryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Information Technology"}>
                  Information Technology
                </MenuItem>
                <MenuItem value={"Finance"}>Finance</MenuItem>
                <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Marketing"}>Marketing</MenuItem>
                <MenuItem value={"Food and Beverage"}>
                  Food and Beverage
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item className="search-items">
            <FormControl>
              <InputLabel id="eventtype-search-label">Event Type</InputLabel>
              <Select
                labelId="eventtype-search-label"
                className="searchEventDropdown"
                value={searchQuery.eventType}
                onChange={eventTypeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Alumni Gathering"}>Alumni Gathering</MenuItem>
                <MenuItem value={"Career Fair"}>Career Fair</MenuItem>
                <MenuItem value={"Networking Meetup"}>
                  Networking Meetup
                </MenuItem>
                <MenuItem value={"Informational Interview"}>
                  Informational Interview
                </MenuItem>
                <MenuItem value={"Conference"}>Conference</MenuItem>
                <MenuItem value={"Webinar/Workshop"}>Webinar/Workshop</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item className="search-items">
          <Button variant="contained" sx={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "14px", paddingBottom: "14px" }}>Search</Button>
        </Grid>
        </Grid>
        <div className="allCardsWrapper">
          <Grid container spacing={2}>
            {eventCards}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
