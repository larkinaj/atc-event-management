import express from 'express';
import { Request, Response, NextFunction} from 'express';
import eventController from '../controllers/eventController'

const eventRouter = express.Router();

eventRouter.get('/', (_req: Request, res: Response, _next: NextFunction) : void =>{
    console.log('In eventRouter')
})

export default eventRouter;