import {query} from '../models/appModel'
import { Request, Response, NextFunction} from 'express';


const eventController = {
    getAllEvents : async (_req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {
            const request = 'SELECT * FROM events';
            // const values: any = [];
            const response: any = await query(request);
            res.locals.events = response.rows;
            return next();
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.getAllEvents Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
    },
    getEvent : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
    try {
        const event_id = req.params.event_id 
        const request = 'SELECT * FROM events WHERE event_id = $1';
            const values: any[] = [event_id];
            const response: any = await query(request, values);
            res.locals.event = response.rows;
            return next();
        
    } catch (err) {
        return (next({
            log: 'Error occured in eventController.getEvent Middleware',
            message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
          }));
    }
    }, 
    postEvent : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {
            const {name, industry, event_type, description, host_id, total_attendees, location, status, date_time, picture} = req.body
            const request = 'INSERT INTO events (name, industry, event_type, description, host_id, total_attendees, location, status, date_time, picture) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *';
                const values: any[] = [name, industry, event_type, description, host_id, total_attendees, location, status, date_time, picture];
                const response: any = await query(request, values);
                res.locals.event = response.rows;
                return next();
            
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.postEvent Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
        },
        putEvent : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
            try {
                const event_id = req.params.event_id 
                const {name, industry, event_type, description, host_id, total_attendees, location, status, date_time, picture} = req.body
                const request = 'UPDATE events SET name = $1, industry = $2, event_type = $3, description = $4, host_id = $5, total_attendees =$6, location =$7, status = $8, date_time = $9, picture = $10 WHERE event_id= $11 RETURNING *';
                    const values: any[] = [name, industry, event_type, description, host_id, total_attendees, location, status, date_time, picture, event_id];
                    const response: any = await query(request, values);
                    res.locals.event = response.rows;
                    return next();
                
            } catch (err) {
                return (next({
                    log: 'Error occured in eventController.putEvent Middleware',
                    message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
                  }));
            }
            },
            deleteEvent : async (req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
                try {
                    const event_id = req.params.event_id 
                    const request = 'DELETE FROM events WHERE event_id = $1 RETURNING *';
                        const values: any[] = [event_id];
                        const response: any = await query(request, values);
                        res.locals.event = response.rows;
                        return next();
                } catch (err) {
                    return (next({
                        log: 'Error occured in eventController.deleteEvent Middleware',
                        message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
                      }));
                }
                }  
};



export default eventController;

//  : async (_req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
//     try {
        
        
//     } catch (err) {
//         return (next({
//             log: 'Error occured in eventController.------ Middleware',
//             message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
//           }));
//     }
// }