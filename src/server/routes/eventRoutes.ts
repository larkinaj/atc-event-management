import express from 'express';
import { Request, Response, NextFunction} from 'express';
import eventController from '../controllers/eventController'

const eventRouter = express.Router();

eventRouter.get('/allEvents', eventController.getAllEvents, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.events);
})

eventRouter.get('/:event_id', eventController.getEvent, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.event);
})

eventRouter.post('/', eventController.postEvent, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.event);
})

eventRouter.put('/:event_id', eventController.putEvent, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.event);
})

eventRouter.delete('/:event_id', eventController.deleteEvent, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.event);
})


export default eventRouter; 