import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./styles/header.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#003366" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to={"/dashboard"}
          sx={{ flexGrow: 1, color: "#ffffff", textDecoration: "none" }}
        >
          CareerConnect
        </Typography>
        <Box>
          <Button
            component={RouterLink}
            to="/create-event"
            sx={{ color: "#ffffff", textDecoration: "none" }}
          >
            Create Event
          </Button>
          <Button
            component={RouterLink}
            to={`/profile/${props.currentUser.username}`}
            sx={{
              backgroundColor: "#ffffff",
              color: "#003366",
              textDecoration: "none",
              marginLeft: "16px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#1976D2", color: "#FFFFFF" },
            }}
          >
            {props.currentUser.username}
          </Button>
          <Button
            component={RouterLink}
            // to={"/"}
            sx={{
              backgroundColor: "#ffffff",
              color: "#003366",
              textDecoration: "none",
              marginLeft: "16px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#1976D2", color: "#FFFFFF" },
            }}
            onClick={async () => {
              try {
                const response = await fetch(
                  "http://localhost:3000/api/users/logout",
                  {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (response.status === 200) {
                  console.log("Logged out successfully");
                  navigate("/");
                } else {
                  console.error("Error deleting event:", response.status);
                }
              } catch (err) {
                console.error("Error deleting event:", err);
              }
            }}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
