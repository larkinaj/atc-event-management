import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import ProfilePage from "./ProfilePage";
import CreateEvent from "./CreateEvent";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  spacing: 8,
  overrides: {
    MuiGrid: {
      container: {
        margin: '0.5rem',
      },
      item: {
        margin: '0.5rem',
      },
    },
  },
});


const App = () => {
  const [eventDetails, setEventDetails] = useState({
    nameOfEvent: '',
    industryOfEvent: '',
    typeOfEvent: '',
    descriptionOfEvent: '',
    locationOfEvent: '',
    priceOfEvent: '',
    imageOfEvent: '',
  })

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/profile" element={<ProfilePage eventDetails={eventDetails} setEventDetails={setEventDetails} />} />
          <Route path="/create-event" element={<CreateEvent eventDetails={eventDetails} setEventDetails={setEventDetails} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/edit-event/:id" element={<CreateEvent eventDetails={eventDetails} setEventDetails={setEventDetails} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;