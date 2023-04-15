import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  TextField,
  InputAdornment,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Typography
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { PhotoCamera } from "@mui/icons-material";
import { Navigate, useParams } from "react-router-dom";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import "./styles/create-event.css";
import Header from "./Header";

const CreateEvent = (props) => {

  const navigate = useNavigate();

  const [eventDateTime, setEventDateTime] = useState(dayjs(new Date()));
  const { id } = useParams()

  useEffect(() => {}, []);

  const eventNameChange = (event) => {
    console.log("EVENT NAME CHANGE", event.target.value);
    const eventDetailsCopy = structuredClone(props.eventDetails);
    eventDetailsCopy.nameOfEvent = event.target.value;
    props.setEventDetails(eventDetailsCopy);
  };

  const eventIndustryChange = (event) => {
    console.log("EVENT INDUSTRY CHANGE", event.target.value);
    const eventDetailsCopy = structuredClone(props.eventDetails);
    eventDetailsCopy.industryOfEvent = event.target.value;
    props.setEventDetails(eventDetailsCopy);
  };

  const eventTypeChange = (event) => {
    console.log("EVENT TYPE CHANGE", event.target.value);
    const eventDetailsCopy = structuredClone(props.eventDetails);
    eventDetailsCopy.typeOfEvent = event.target.value;
    props.setEventDetails(eventDetailsCopy);
  };

  const eventDescriptionChange = (event) => {
    console.log("EVENT DESCRIPTION CHANGE", event.target.value);
    const eventDetailsCopy = structuredClone(props.eventDetails);
    eventDetailsCopy.descriptionOfEvent = event.target.value;
    props.setEventDetails(eventDetailsCopy);
  };

  const eventDateChange = (event) => {
    console.log("EVENT DATE CHANGE", event);
    setEventDateTime(event);
  };

  const eventLocationChange = (event) => {
    console.log("EVENT LOCATION CHANGE", event.target.value);
    const eventDetailsCopy = structuredClone(props.eventDetails);
    eventDetailsCopy.locationOfEvent = event.target.value;
    props.setEventDetails(eventDetailsCopy);
  };

  const eventPriceChange = (event) => {
    console.log("EVENT DESCRIPTION CHANGE", event.target.value);
    const eventDetailsCopy = structuredClone(props.eventDetails);
    eventDetailsCopy.priceOfEvent = event.target.value;
    props.setEventDetails(eventDetailsCopy);
  };

  const eventImageChange = (event) => {
    console.log("EVENT IMAGE CHANGE", event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result);
    });
    // const eventDetailsCopy = structuredClone(eventDetails)
    // eventDetailsCopy.nameOfEvent = event.target.value
    // setEventDetails(eventDetailsCopy);
  };

  const submitEvent = async (event) => {
    const {
      nameOfEvent,
      industryOfEvent,
      typeOfEvent,
      descriptionOfEvent,
      locationOfEvent,
      priceOfEvent,
    } = props.eventDetails;

    if (id) {
      const response = await axios.put(`http://localhost:3000/api/events/${id}`, {
        event_id: Number(id),
        event_name: nameOfEvent,
        industry: industryOfEvent,
        event_type: typeOfEvent,
        event_description: descriptionOfEvent,
        host_id: props.currentUser.user_id,
        total_attendees: 0,
        event_location: locationOfEvent,
        event_status: true,
        date_time: eventDateTime.format('YYYY-MM-DD HH:mm'),
        event_price: priceOfEvent,
        picture: null,
      });
      console.log('database response',response);
    }
    if (!id) {
      const response = await axios.post("http://localhost:3000/api/events", {
        event_name: nameOfEvent,
        industry: industryOfEvent,
        event_type: typeOfEvent,
        event_description: descriptionOfEvent,
        host_id: props.currentUser.user_id,
        total_attendees: 0,
        event_location: locationOfEvent,
        event_status: true,
        date_time: eventDateTime.format('YYYY-MM-DD HH:mm'),
        event_price: priceOfEvent,
        picture: null,
      });
      console.log('database response',response);
    }

    props.setEventDetails({
      nameOfEvent: '',
      industryOfEvent: '',
      typeOfEvent: '',
      descriptionOfEvent: '',
      locationOfEvent: '',
      priceOfEvent: '',
      imageOfEvent: '',
    });
    navigate("/dashboard");
  };


  const formTitle = id ? "Edit Event" : "Create Event";

  return (
    <div>
      <Header currentUser={props.currentUser}/>
    <div className="createEventPage">
      <Typography variant="h4" sx={{ margin: "0.5rem" }}>{formTitle}</Typography>
      <div className="createEventBox">
        <div className="createEventInput">
          <h4 className="createEventLeft">Name of event:</h4>
          <TextField
            fullWidth
            required
            id="outlined-required"
            name="eventName"
            label="Event Name"
            variant="outlined"
            onChange={eventNameChange}
            value={props.eventDetails.nameOfEvent}
            className="full-width"
            size="small"
          />
        </div>
        <div className="createEventInput">
          <h4 className="createEventLeft">Industry:</h4>
          <FormControl sx={{ minWidth: 200 }} fullWidth size="small">
            <InputLabel className="">Event Industry</InputLabel>
            <Select
              className=""
              value={props.eventDetails.industryOfEvent}
              autoWidth={true}
              onChange={eventIndustryChange}
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
              <MenuItem value={"Food and Beverage"}>Food and Beverage</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="createEventInput">
          <h4 className="createEventLeft">Event Type:</h4>
          <FormControl sx={{ minWidth: 200 }} className="full-width" size="small">
            <InputLabel className="full-width">Event Type</InputLabel>
            <Select
              className=""
              value={props.eventDetails.typeOfEvent}
              onChange={eventTypeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Alumni Gathering"}>Alumni Gathering</MenuItem>
              <MenuItem value={"Career Fair"}>Career Fair</MenuItem>
              <MenuItem value={"Networking Meetup"}>Networking Meetup</MenuItem>
              <MenuItem value={"Informational Interview"}>
                Informational Interview
              </MenuItem>
              <MenuItem value={"Conference"}>Conference</MenuItem>
              <MenuItem value={"Webinar/Workshop"}>Webinar/Workshop</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="createEventInput">
          <h4 className="createEventLeft">Description:</h4>
          <TextField
            fullWidth
            required
            id="outlined-required"
            name="eventDescription"
            label="Event Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={eventDescriptionChange}
            value={props.eventDetails.descriptionOfEvent}
            className="full-width"
          />
        </div>
        <div className="createEventInput">
          <h4 className="createEventLeft">Date and Time:</h4>
          <FormControl sx={{ minWidth: 200 }} className="full-width" size="small">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              className="full-width"
            >
              <DateTimePicker
                label="Event Date and Time"
                onChange={eventDateChange}
                value={eventDateTime}
                fullWidth
                className="full-width"
                format="YYYY-MM-DD HH:mm"
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="createEventInput">
          <h4 className="createEventLeft">Location:</h4>
          <TextField
            fullWidth
            required
            id="outlined-required"
            name="eventLocation"
            label="Event Location"
            variant="outlined"
            onChange={eventLocationChange}
            value={props.eventDetails.locationOfEvent}
            className="full-width"
            size="small"
          />
        </div>
        <div className="createEventInput">
          <h4 className="createEventLeft">Admission fee:</h4>
          <div className="createEventRight">
            <FormControl sx={{ minWidth: 200 }} className="full-width">
              <InputLabel htmlFor="price-required">Price</InputLabel>
              <OutlinedInput
                required
                className="full-width"
                id="price-required"
                name="eventPrice"
                label="Price"
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                variant="outlined"
                onChange={eventPriceChange}
                value={props.eventDetails.priceOfEvent}
                size="small"
              />
            </FormControl>
          </div>
        </div>
        <Button
          component="label"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#003366", margin: "10px", width: "200px" }}
        >
          Upload Image 
          <PhotoCamera sx={{ marginLeft: "5px", fontSize: "1rem" }} />
          <input
            onChange={eventImageChange}
            hidden
            accept="image/*"
            multiple
            type="file"
          />
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#003366", margin: "10px", width: "200px" }}
          onClick={submitEvent}
        >
          Submit Form
        </Button>
      </div>
    </div>
    </div>
  );
};

export default CreateEvent;
