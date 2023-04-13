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
import userController from '../controllers/userController';
import passport from 'passport';
import '../helpers/passport-config';

const userRoutes = express.Router();

userRoutes.post('/register', userController.createUser, (req: Request, res: Response, next:NextFunction):void => {
    // user registers with the necessary information 
    try {
        if (res.locals.authSuccess) {
            // send back success --> so front-end can reroute
            // log user in to begin session 
            req.logIn(res.locals.newUser, (err: Error) => {
                if (err) throw err; 
                else res.status(200).json(res.locals.newUser);  // send back new user info
            });
        } else {  // authSuccess === false
            res.status(400).send('Registration failed');
        }
    } catch (err) {
        next({log: 'error in user registration', message: err});
    } 

}); 

userRoutes.get('/getUser', (req: Request, res:Response, next:NextFunction):void => {
     try {
        if (res.locals.userInfo) res.send(200).json(res.locals.userInfo);
        else res.status(400).send('You must log in or register');
     } catch (err) {
        next({log: 'error in getting user data', message: err});
     }
});

userRoutes.post('/login', (req: Request, res: Response, next: NextFunction):void => {
    try {
        const { username, password } = req.body; 
        passport.authenticate('local', (err: Error, user: Express.User, info: unknown) => {
            if (err) throw err; 
            if (!user) res.status(400).send('You do not have permission to log in');
            else {
                // successful log in
                req.logIn(user, (err: Error) => {
                    if (err) throw err;
                    else res.status(200).json(req.user);
                });
            }
        })(req, res, next);
    } catch (err) {
        next({log: 'something went wrong in passport auth', message: err});
    }
});

// STILL NEED: edit

// delete user from db

// delete session --> log out

// get events attending / get events hosting 


export default userRoutes; 
