import {query} from '../models/appModel'
import { Request, Response, NextFunction} from 'express';

const attendeesController = {
    getAttendees : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {
            const event_id = req.params.event_id;
            const request = 'SELECT a.attendee_id, a.user_id, u.first_name, u.last_name, u.email, u.bio, u.industry FROM attendees a JOIN users u ON a.user_id = u.user_id WHERE a.event_id = $1';
            const values: any = [event_id];
            const response: any = await query(request, values);

            res.locals.attendees = response.rows;
            return next();
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.getAttendees Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
    },
    postAttendee : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {
            if(res.locals.isAttending){
                console.log('user is attending')
                res.status(300).json('user already attending event');
            } 
            const {event_id, user_id} = req.params;
            const request = 'INSERT INTO attendees (event_id, user_id) VALUES ($1, $2) RETURNING *';
            const values: any = [event_id, user_id];
            const response: any = await query(request, values);
            res.locals.attendee = response.rows;
            return next();
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.postAttendee Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
        
        
    },
    deleteAttendee : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {
            const {event_id, user_id} = req.params;
            const request = 'DELETE FROM attendees WHERE event_id = $1 AND user_id = $2 RETURNING *';
            const values: any = [event_id, user_id];
            const response: any = await query(request, values);
            res.locals.attendee = response.rows;
            return next();
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.deleteAttendee Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
        
        
    },
    isAttending : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {
            const {event_id, user_id} = req.params;
            const request = 'SELECT * FROM attendees WHERE event_id = $1 AND user_id = $2';
            const values: any = [event_id, user_id];
            const response: any = await query(request, values);
            
            res.locals.isAttending = response.rows.length;

            return next();
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.isAttending Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
    }
}

export default attendeesController;