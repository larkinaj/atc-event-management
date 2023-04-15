import express from 'express';
import { Request, Response, NextFunction} from 'express';
import attendeesController from '../controllers/attendeesController'

const attendeesRouter = express.Router();

attendeesRouter.get('/:event_id', attendeesController.getAttendees, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.attendees);
})

attendeesRouter.get('/isAttending/:event_id/:user_id', attendeesController.isAttending, (_req: Request, res: Response, _next: NextFunction) : void =>{

    res.status(200).json(res.locals.isAttending);
})

attendeesRouter.post('/:event_id/:user_id', attendeesController.isAttending, attendeesController.postAttendee, (_req: Request, res: Response, _next: NextFunction) : void =>{

        res.status(200).json(res.locals.attendee);
})

attendeesRouter.delete('/:event_id/:user_id', attendeesController.deleteAttendee, (_req: Request, res: Response, _next: NextFunction) : void =>{
    res.status(200).json(res.locals.attendee);
})


export default attendeesRouter;