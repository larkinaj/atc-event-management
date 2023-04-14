// configure passport-local strategy here

import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { query } from '../models/appModel';
import userPass from './userPass';
import express from 'express';

declare global {
    namespace Express {
        interface User {
            // structure of userObj queried back from db 
            // "optional" fields marked with a "?"        
            user_id: number | string,
            username: string,
            password_?: string,
            first_name: string,
            last_name: string,
            email: string,
            bio: string,
            industry: string,
            user_resume?: unknown,
            picture?: unknown
        }
    }
};

// serialize user for session (saves relevant user information)
passport.serializeUser(function (user:Express.User, done):void {
    console.log('serialized user');
    return done(null, {
        user_id: user.user_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        industry: user.industry
    })
    // STARTS a session and saves the defined fields ONTO req.session.passport.user.{...}

});

// deserializes user for session auth (req.user prop is set to yielded info)
// saved essential info on session so that we won't need to keep querying the db for it
passport.deserializeUser(function (user:Express.User, done):void {
    console.log('deserialized user');
    return done(null, user);
    // ATTACHES the userObject to req.user.{...}
    // req.user now contains the authenticated user object for the entire session 
    // you can use it on any of the routes as SESSION IS MAINTAINED
});

// authentication 
passport.use(new LocalStrategy({
        usernameField:"username",
        passwordField: "password"
    },
    async function (username: string, password: string, done):Promise<unknown> {
        try {
            const sqlStr = `SELECT * FROM users WHERE username = $1;`;
            const queryRes: any = await query(sqlStr, [ username ]);
            if (queryRes.rows[0]) {
                // there is a matching user
                const { password_:hashedPass } = queryRes.rows[0]; 
                const verifyPass = await userPass.comparePass(password, hashedPass);
                if (verifyPass === false) return done(null, false, {message: "Incorrect password"});  // FALSE

                // else --> TRUE
                return done(null, queryRes.rows[0]);  // no error, returning user found 
            } 
            else {
                return done(null, false, {message: "No such user found"});  // no error, but no user match found 
            }
        } catch (err) {
            return done({log: 'Error in passport authenticate', message: err});  // error encountered
        }
    }
    // yields the auth'd user onto SERIALIZE()
));