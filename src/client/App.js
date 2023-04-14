import React from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import ProfilePage from "./ProfilePage";
import EventCreation from "./EventCreation";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/eventcreation" element={<EventCreation />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/reset" element={<ForgotPassword />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;