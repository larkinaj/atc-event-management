import express from 'express';
import { Request, Response, NextFunction} from 'express';

//import all routes
import eventRouter from './eventRoutes'
import userRouter from './userRoutes'

const api = express.Router();

api.use('/events',eventRouter);
api.use('/users',userRouter);


export default api;