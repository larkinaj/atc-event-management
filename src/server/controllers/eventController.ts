// import db from '../models/appModel'
import { Request, Response, NextFunction} from 'express';

const eventController = {
    getEvents : async (_req: Request, res: Response, next: NextFunction): Promise<unknown>=>  {
        try {

            
        } catch (err) {
            return (next({
                log: 'Error occured in eventController.getBills Middleware',
                message: { err: JSON.stringify(err, Object.getOwnPropertyNames(err)) },
              }));
        }
    }
};



export default eventController;