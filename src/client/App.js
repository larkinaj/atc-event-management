import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import EventPage from "./EventPage";
import ProfilePage from "./ProfilePage";
import EventCreation from "./EventCreation";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/eventpage" element={<EventPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/eventcreation" element={<EventCreation />} />
            </Routes>
        </div>
    )
}

export default App;