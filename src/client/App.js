import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import ProfilePage from "./ProfilePage";
import CreateEvent from "./CreateEvent";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import EditUserInfo from "./EditUserInfo";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  spacing: 8,
  overrides: {
    MuiGrid: {
      container: {
        margin: "0.5rem",
      },
      item: {
        margin: "0.5rem",
      },
    },
  },
});

const App = () => {
  const [eventDetails, setEventDetails] = useState({
    nameOfEvent: "",
    industryOfEvent: "",
    typeOfEvent: "",
    descriptionOfEvent: "",
    locationOfEvent: "",
    priceOfEvent: "",
    imageOfEvent: "",
  });

  useEffect(() => {}, []);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard currentUser={currentUser} />}
          />
          <Route
            path="/eventpage"
            element={<EventPage currentUser={currentUser} />}
          />
          <Route
            path={`/profile/${currentUser.username}`}
            element={
              <ProfilePage
                currentUser={currentUser}
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
              />
            }
          />
          <Route
            path="/create-event"
            element={
              <CreateEvent
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <Registration
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/edituserinfo"
            element={
              <EditUserInfo
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route
            path="/edit-event/:id"
            element={
              <CreateEvent
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                currentUser={currentUser}
              />
            }
          />
        <Route
            path="/event/:id"
            element={
              <EventPage
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;