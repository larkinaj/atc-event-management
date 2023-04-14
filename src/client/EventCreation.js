import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const industries = [
  'Technology',
  'Arts',
  'Music',
  'Business',
  'Food & Drink',
  // Add more industries as needed
];

const eventTypes = [
  'Conference',
  'Seminar',
  'Workshop',
  'Concert',
  'Party',
  // Add more event types as needed
];

const EventCreation = () => {
  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={industries}
              renderInput={(params) => (
                <TextField {...params} label="Industry" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              options={eventTypes}
              renderInput={(params) => (
                <TextField {...params} label="Event Type" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Description"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Location" variant="outlined" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Date" type="date" variant="outlined" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Time" type="time" variant="outlined" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Price" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EventCreation;
