// implement user routes here 
// user CRUD: 
// register for a new account with username / encrypted password
// log in & and gain access to information 
// update any part of user information saved in database 
// delete user completely --> set relevant events to be null 

import express from 'express';
// import types
import { Request, Response, NextFunction} from 'express';
// import { Strategy as LocalStrategy } from 'passport-local';
// import passport from 'passport';
// import { query } from '../models/appModel';
import userController from './controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/register', userController.createUser, (req: Request, res:Response, next:NextFunction):void => {
    // user registers with the necessary information 
    try {
        if (res.locals.authSuccess) {
            // send back success --> so front-end can reroute
            // log user in to begin session 
            return res.status(200).json(res.locals.authSuccess);
        } else {
            return res.status(400).send('Try again');
        }
    } catch (err) {
        return next({log: 'error in user registration', message: err});
    } 

}); 

userRoutes.get('/login', (req: Request, res:Response, next:NextFunction):void => {
    // authenticates user with local username / pw
    try {
        
    } catch (err) {
        
    }
});


export default userRoutes; 
