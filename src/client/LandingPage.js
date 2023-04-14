import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Box, Link, Typography } from "@mui/material";
import "./styles/landingpage.css";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import backgroundImage from "./assets/background.jpeg";

const LandingPage = () => {
  const loginUser = (event) => {
    event.preventDefault();
    let credentials = {
      userLogin: event.target.userLogin.value,
      passLogin: event.target.passLogin.value,
    };
    console.log(credentials);
    // Uncomment the code below once the backend team finishes the routes
    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(credentials)
    // })
    // .then((res)=>res.json())
    // .then((data) => {
    //   console.log(data)
    // })
  };

  const items = [
    "Alumni gatherings",
    "Career fairs",
    "Informational interviews",
    "Networking meetups",
    "Professional conferences",
    "Webinars and workshops",
  ];

  const testRequest = () => {
    return fetch(`http://localhost:3000/api/login`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log("data from fetch: ", data));
  };
  testRequest();

  return (
    <div className="landing-page">
      <div
        className="left-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>CareerConnect</h1>
        <div className="slogan">
          <h2>Elevate your events. Get the job done.</h2>
          <div>
            <ul>
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="login-card">
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={loginUser}
          >
            <div className="loginInputs">
              <h2>Login</h2>
              <TextField
                required
                id="outlined-required"
                name="userLogin"
                label="Username"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputLabel-outlined": {
                    // Vertically centers the label
                    transform: "translate(14px, 50%)", // Adjust the 50% value to fine-tune the vertical position
                  },
                  "& .MuiOutlinedInput-root": {
                    // Removes underline that display by default
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
              <TextField
                required
                id="outlined-required"
                name="passLogin"
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputLabel-outlined": {
                    // Vertically centers the label
                    transform: "translate(14px, 50%)", // Adjust the 50% value to fine-tune the vertical position
                  },
                  "& .MuiOutlinedInput-root": {
                    // Removes underline that displays by default
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
            </div>
            <div className="loginButtons">
              <Button type="submit" variant="outlined" size="small">
                Login
              </Button>
              <br></br>
              <div>
                <Typography
                  component="span"
                  sx={{ fontSize: "12px", color: "#778899" }}
                >
                  Not a member?{" "}
                </Typography>
                <Link
                  component={RouterLink} to="/registration"
                  sx={{ fontSize: "12px", color: "#003366" }}
                >
                  Signup
                </Link>{" "}
                |{" "}
                <Link
                  component={RouterLink} to="/reset"
                  sx={{ fontSize: "12px", color: "#003366" }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
