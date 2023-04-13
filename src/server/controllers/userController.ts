// user auth controllers for anna 

import { Request, Response, NextFunction} from 'express';
import { query } from '../models/appModel'; 
// import db from '../appModel';
import userPass from '../helpers/userPass';

// description is optional 
const required = ['username', 'password', 'first_name', 'last_name', 'email', 'industry'];
const edits = ['first_name', 'last_name', 'email', 'bio', 'industry'];

const userController = {

    createUser: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
        try {
            // check existence of required properties 
            for (const els of required) {
                if (!req.body[els] || typeof req.body[els] !== 'string') {
                    res.locals.authSuccess = false;  // break out of loop if any field is missing or if data type is not string
                    return next(); 
                }
            }

            // de-structure incoming request body 
            const { username, password, first_name, last_name, email, bio, industry } = req.body; 
            const hashedPass = await userPass.hashPass(password);

            console.log('hashed password ', hashedPass);
            console.log('hashed password type ', typeof hashedPass);

            const newUser = [username, hashedPass, first_name, last_name, email, bio, industry];

            // query to create user in database --> then generate a JWT 
            const sqlStr = `INSERT INTO users
            (username, password_, first_name, last_name, email, bio, industry)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`;

            console.log(sqlStr);

            const queryRes: any = await query(sqlStr, newUser);
            if (queryRes.rows[0]) { 
                // should only be true if queryRes is not empty
                res.locals.authSuccess = true;
                res.locals.newUser = queryRes.rows[0];

                console.log('sql res: ', res.locals.newUser);

            }  
            return next(); 


        } catch (err) {
            return next({log: 'Error in createUser controller', message: err});
        }

    },

    getUser: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
        // when you're logged in --> get back just the req.user
        try {
            res.locals.userInfo = req.user;
            return next();
        } catch (err) {
            return next({log: 'Error in getUser controller', message: err});
        }
    },

};

export default userController; 