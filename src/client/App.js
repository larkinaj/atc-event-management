import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import ProfilePage from "./ProfilePage";
import CreateEvent from "./CreateEvent";
import EventCreation from "./EventCreation";

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
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/eventpage" element={<EventPage />} />
                <Route path="/profile" element={<ProfilePage eventDetails={eventDetails} setEventDetails={setEventDetails} />} />
                <Route path="/create-event" element={<CreateEvent eventDetails={eventDetails} setEventDetails={setEventDetails} />} />
                <Route path="/eventcreation" element={<EventCreation />} />
                <Route path="/edit-event/:id" element={<CreateEvent eventDetails={eventDetails} setEventDetails={setEventDetails} />} />
            </Routes>
        </div>
    )
}

export default App;