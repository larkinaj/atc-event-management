// user auth controllers for anna 

import { Request, Response, NextFunction} from 'express';
import { query } from '../models/appModel'; 
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
                    res.locals.registerSuccess = false;  // break out of loop if any field is missing or if data type is not string
                    return next(); 
                }
            }

            // de-structure incoming request body 
            const { username, password, first_name, last_name, email, bio, industry } = req.body; 
            const hashedPass = await userPass.hashPass(password);

            console.log('hashed password: ', hashedPass);
            console.log('hashed password type: ', typeof hashedPass);

            const newUser = [username, hashedPass, first_name, last_name, email, bio, industry];

            // query to create user in database --> then generate a JWT 
            const sqlStr = `INSERT INTO users
            (username, password_, first_name, last_name, email, bio, industry)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`;

            const queryRes: any = await query(sqlStr, newUser);
            if (queryRes.rows[0]) { 
                // should only be true if queryRes is not empty
                res.locals.registerSuccess = true;
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

            console.log('req.user is: ', req.user);

            // res.locals.userInfo = req.user;

            // WHEN SESSION WORKS ---> ALL WE NEED IS REQ.USER
            // TEMP --> REQ.PARAMS 
            const sqlStr = `SELECT * FROM users WHERE user_id = $1`;
            const queryRes: any = await query(sqlStr, [ req.params.id ]);
            res.locals.userInfo = queryRes.rows[0];
            return next();
        } catch (err) {
            return next({log: 'Error in getUser controller', message: err});
        }
    },

    deleteUser: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
        // completely erase user instance from db
        try {
            // WHEN SESSION WORKS ---> ALL WE NEED IS REQ.USER
            // TEMP --> REQ.PARAMS 
            const sqlStr = `DELETE from users 
            WHERE user_id = $1;`;
            const queryRes: any = await query(sqlStr, [ req.params.id ]);
            if (queryRes.rows[0]) res.locals.deletedUser = queryRes.rows[0];
            return next(); 

        } catch (err) {
            return next({log: 'Error in deleteUser controller', message: err});
        }
    },

    editUser: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
        // edit user profile information

        console.log('req params: ', req.params);
        console.log('req user: ', req.user);

        try {
            // WHEN SESSION WORKS ---> ALL WE NEED IS REQ.USER
            // TEMP --> REQ.PARAMS 
            const sqlVars = [];  // array to populate for sql query (PUSH)
            const sqlStr = `UPDATE users 
            SET first_name =  $1,
            last_name = $2,
            email = $3,
            bio = $4,
            industry = $5
            WHERE user_id = $6;`;
            for (let i = 0; i < edits.length; i++) {
                if (!req.body[edits[i]]) {
                    // DEFAULT ON FORM = POPULATED WITH ALREADY EXISTING INFO
                    return next(); 
                }
                sqlVars.push(req.body[edits[i]]);
            }

            sqlVars.push(req.params.id);
            const queryRes: any = await query(sqlStr, sqlVars); 
            if (queryRes.rows[0]) res.locals.editedUser = queryRes.rows[0];  console.log(queryRes.rows[0]);
            return next();

        } catch (err) {
            return next({log: 'Error in editUser controller', message: err});
        }
    },

    // getUserEvents: async (req: Request, res:Response, next:NextFunction):Promise<unknown> => {
    //     // get user's attending events and hosting events 
    //     // WHEN SESSION WORKS ---> ALL WE NEED IS REQ.USER
    //     // TEMP --> REQ.PARAMS 
    //     const id = req.params.id; 
    //     const hostSQL = ``;

    //     const attendSQL = ``;
    // },

};

export default userController; 