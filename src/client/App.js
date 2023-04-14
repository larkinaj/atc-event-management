import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";
import CreateEvent from "./CreateEvent";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/create-event" element={<CreateEvent />} />
            </Routes>
        </div>
    )
}

export default App;