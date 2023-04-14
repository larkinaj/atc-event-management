import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import "./styles/registration.css";

const industries = [
  "Information Technology",
  "Finance",
  "Healthcare",
  "Entertainment",
  "Marketing",
  "Food and Beverage",
];

const Registration = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    industry: "",
    resume: null,
    picture: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: files[0] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
  };

  return (
    <div className="registration-page">
    <Container className="signUp" maxWidth="xs">
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          variant="outlined"
          margin="normal"
          label="Username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          size="small"
          className="custom-margin"
        />
        <TextField
          fullWidth
          required
          variant="outlined"
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          size="small"
          className="custom-margin"
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              size="small"
              className="custom-margin"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              margin="normal"
              label="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              size="small"
              className="custom-margin"
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          required
          variant="outlined"
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          size="small"
          className="custom-margin"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          label="Bio"
          name="bio"
          value={formValues.bio}
          onChange={handleChange}
          size="small"
          className="custom-margin"
        />
        <TextField
          fullWidth
          select
          required
          variant="outlined"
          margin="normal"
          label="Industry"
          name="industry"
          value={formValues.industry}
          onChange={handleChange}
          size="small"
          className="custom-margin"
        >
          {industries.map((industry) => (
            <MenuItem key={industry} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </TextField>
        <div className="reg-buttons">
        <Button fullWidth variant="contained" component="label" margin="normal" className="custom-margin">
          Upload Resume
          <input type="file" hidden name="resume" onChange={handleFileChange} />
        </Button>
        <Button fullWidth variant="contained" component="label" margin="normal" className="custom-margin">
          Upload Picture
          <input
            type="file"
            hidden
            name="picture"
            onChange={handleFileChange}
          />
        </Button>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          margin="normal"
          className="custom-margin"
        >
          Register
        </Button>
        </div>
      </form>
    </Container>
    </div>
  );
};

export default Registration;