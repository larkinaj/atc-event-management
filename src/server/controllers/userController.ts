// user auth controllers for anna 

import { Request, Response, NextFunction} from 'express';
import { query } from '../models/appModel'; 
import userPass from '../helpers/userPass';

// description is optional 
const required = [username, password, first_name, last_name, email, industry];
const edits = [first_name, last_name, email, bio, industry];

userController = {

    createUser: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
        try {
            // check existence of required properties 
            for (const els of required) {
                if (!req.body[els]) {
                    res.locals.authSuccess = false;  // break out of loop if any field is missing 
                    return next(); 
                }
            }

            // de-structure incoming request body 
            const { username, password, first_name, last_name, email, bio, industry } = req.body; 
            const hashedPass = await userPass.hashPass(password);
            const newUser = [username, hashedPass, first_name, last_name, email, bio, industry];

            // query to create user in database --> then generate a JWT 
            const sqlStr = `INSERT INTO Users
            (username, password_, first_name, last_name, email, bio, industry)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`;

            const queryRes = await query(sqlStr, newUser);
            if (queryRes) { 
                // should only be true if queryRes is not empty
                res.locals.authSuccess = true;
            }  
            return next(); 


        } catch (err) {
            return next({log: 'Error in createUser controller', message: err});
        }

    },

    getUser: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
        // if you want to navigate to another user's profile and retrieve their information 
        
    },

};

export default userController; 