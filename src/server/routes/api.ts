import express from 'express';
import { Request, Response, NextFunction} from 'express';

//import all routes
import attendeesRouter from './attendeesRoutes'
import eventRouter from './eventRoutes'
import userRouter from './userRoutes'

const api = express.Router();

api.use('/attendees',attendeesRouter);
api.use('/events',eventRouter);
api.use('/users',userRouter);


export default api;