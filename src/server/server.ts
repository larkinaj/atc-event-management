import express from 'express';
import path from 'path';
import passport from 'passport';
import './helpers/passport-config';
import userRoutes from './routes/userRoutes';
const app = express();

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000; 

// import types
import { Request, Response, NextFunction } from 'express';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MOUNT PASSPORT / AUTH / SESSIONS HERE


// MOUNT ALL ROUTES HERE (ORDER MATTERS)
app.use('/api', userRoutes);

// catch-all route handler 
app.use((_req: Request, res: Response): unknown => res.status(404).send('This is not the page you\'re looking for...'));


// global error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction): unknown => {
    const defaultErr = {
      log: `Express error handler caught unknown middleware error ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

// listen for active server port 
app.listen(PORT, ():void => {
    console.log(`Server listening on port: ${PORT}... \n`);
  }); //listens on port 3000 -> http://localhost:3000/ 
      
// stop tasks on killing server
process.on('SIGINT', function() {
    console.log('server has been killed... stopping task \n');
    process.exit(0);    
});

