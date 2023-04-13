import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}

export default App;