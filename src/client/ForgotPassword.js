import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import './styles/forgotpassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the forgot password logic here
  };

  return (
    <div className="reset-page">
    <Container maxWidth="xs">
      <Box sx={{ textAlign: 'center', my: 4 }} className="custom-margin">
        <Typography variant="h4" sx={{ color: "#778899" }}>Forgot Password</Typography>
        <Typography variant="subtitle3" sx={{ color: "#778899" }}>
          Enter your email address and we will send you instructions on how to
          reset your password.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          variant="outlined"
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          className="custom-margin"
          size="small"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          margin="normal"
          className="custom-margin"
          sx={{
            backgroundColor: '#003366',
            '&:hover': {
              backgroundColor: '#00274d',
            },
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600',
            padding: '10px',
            cursor: 'pointer',
            marginTop: '10px',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
        >
          Send Reset Instructions
        </Button>
      </form>
    </Container>
    </div>
  );
};

export default ForgotPassword;