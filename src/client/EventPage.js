import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  CardMedia,
} from "@mui/material";
import { Box } from "@mui/system";
import "./styles/eventpage.css";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import imageFileName from './assets/stock_conference.jpeg';

const EventPage = (props) => {

  const location = useLocation();
  console.log("location: ", location);
  console.log("location.state: ", location.state);
  const event = location.state && location.state.event;
  console.log("event: ", event);

  return (
    <div>
      <Header currentUser={props.currentUser} />
      <div className="event-page">
        <Container>
          <Box mb={3}>
            <CardMedia
              className="banner"
              component="img"
              height="400"
              image={imageFileName}
              alt="Event banner"
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h4" component="h1">
                    {event.event_name}
                  </Typography>
                  {/* <Typography variant="subtitle1" color="textSecondary">
                    Hosted by Host {event.host_id}
                  </Typography> */}
                  <Box my={2}>
                    <Typography variant="body1">
                      {event.industry} Industry
                    </Typography>
                    <Typography variant="body1">
                      {event.event_type}
                    </Typography>
                    <Typography variant="body1">
                      Event Date & Time: {event.date_time}
                    </Typography>
                    <Typography variant="body1">
                      Location: {event.event_location}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {event.event_description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body1">
                      Total Attendees: {event.total_attendees}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h5" component="h2">
                    Get Tickets
                  </Typography>
                  <Typography variant="body1">Price: ${event.event_price}</Typography>
                  <Box my={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        backgroundColor: "#003366",
                        "&:hover": {
                          backgroundColor: "#00274d",
                        },
                        border: "none",
                        borderRadius: "4px",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "10px",
                        cursor: "pointer",
                        marginTop: "10px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default EventPage;