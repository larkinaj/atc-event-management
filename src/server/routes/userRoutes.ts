import express from 'express';
// import types
import { Request, Response, NextFunction} from 'express';
import userController from '../controllers/userController';
import passport from 'passport';

const userRoutes = express.Router();

userRoutes.post('/register', userController.createUser, (req: Request, res: Response, next:NextFunction):void => {
    // user registers with the necessary information 
    try {

        // // if an internal server error has been passed along --> most likely 
        // if (res.locals.error) {
        //     // add an extra field indicating uniqueness constraint was violated
        //     res.locals.errCode = res.locals.error.code ? res.locals.error.code : -1000;
        //     res.status(500).json({code: res.locals.errCode, errObj: res.locals.error}); 
        // } else {

            if (res.locals.registerSuccess) {
                // send back success --> so front-end can reroute
                // log user in to begin session 
                req.logIn(res.locals.newUser, (err: Error) => {
                    if (err) throw err; 
                    else res.status(200).json(res.locals.newUser);  // send back new user info
                });
            } else {  // registerSuccess === false
                res.status(406).json({message: 'Registration failed'});
            }

        // }   
    } catch (err) {
        next({log: 'error in user registration', message: err});
    } 

}); 

userRoutes.post('/login', (req: Request, res: Response, next: NextFunction):void => {
    try {
        const { username, password } = req.body; 
        passport.authenticate('local', (err: Error, user: Express.User, info: unknown) => {
            
            console.log('user', user);
            console.log('info', info);

            if (err) throw err; 
            if (!user) res.status(401).json({message: 'You are not authorized to take this action'});
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

// delete session --> log out
userRoutes.delete('/logout', (req: Request, res: Response, next: NextFunction):void => {
    try {
        req.logout(function (err: Error) {
            if (err) throw err; 
            res.status(200).json({message: 'Logged you out!'});
        });
    } catch (err) {
        next({log: 'something went wrong in passport logout', message: err});
    }
});

// get events attending / get events hosted by user 
userRoutes.get('/getUserEvents', userController.getUserEvents, (req: Request, res:Response, next:NextFunction):void => {
    try {
        if (!res.locals.loggedIn) res.status(401).json({message: 'You are not authorized to take this action'});
        else if (!res.locals.userEvents.hosting[0] && 
                    !res.locals.userEvents.attending[0] &&
                        !res.locals.userEvents.attended[0]) res.status(400).json({message: 'User has no events!'});
        else res.status(200).json(res.locals.userEvents);
    } catch (err) {
        next({log: 'error in getting user-specific events', message: err});
    }
});

// get user's info 
userRoutes.get('/getUser', userController.getUser, (req: Request, res:Response, next:NextFunction):void => {
    try {
       if (res.locals.userInfo && res.locals.loggedIn) res.send(200).json(res.locals.userInfo);
       else res.status(401).json({message: 'You are not authorized to take this action'});
    } catch (err) {
       next({log: 'error in getting user data', message: err});
    }
});

// edit user profile info
userRoutes.put('/editUser', userController.editUser, (req: Request, res: Response, next: NextFunction):void => {
    try {
        if (!res.locals.loggedIn) res.status(401).json({message: 'You are not authorized to take this action'});
        else if (!res.locals.editedUser) res.status(400).json({message: 'No such user exists!'});
        else res.status(200).json(res.locals.editedUser);
    } catch (err) {
        return next({log: 'Error in edit user route', message: err});
    }
});

// delete user from db completely
userRoutes.delete('/deleteUser', userController.deleteUser, (req: Request, res: Response, next: NextFunction):void => {
    try {
        if (!res.locals.loggedIn) res.status(401).json({message: 'You are not authorized to take this action'});
        else if (!res.locals.deletedUser) res.status(400).json({message: 'No such user exists!'});
        else res.status(200).json(res.locals.deletedUser);  // deleting a user should redirect to log user out
    } catch (err) {
        return next({log: 'Error in delete user route', message: err});
    }
});


export default userRoutes; 
