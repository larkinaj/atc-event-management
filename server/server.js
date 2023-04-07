const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = 3000;

// const apiRouter = require('./routes/api.js');

// Disable caching to prevent routes from being redirected to the wrong location
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

// Parse JSON responses:
app.use(express.json());

// Necessary to avoid network error when making front end requests
app.use(cors());

// Serve static js and css bundles from the dist file
app.use(express.static(path.resolve(__dirname, '../dist')));

// Serve all other static files
// app.use(express.static(path.resolve(__dirname, '../client/public')));

// Set routes to redirect to api
// app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// 404 handler
// app.use((req, res) =>
//   res.status(404).sendFile(path.resolve(__dirname, '../client/public/404.html'))
// );

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});