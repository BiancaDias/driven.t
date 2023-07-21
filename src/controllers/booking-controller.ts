import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getBookingService, postBookingService, putBookingService } from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    try {
        const booking = await getBookingService(Number(userId));
    
        res.status(httpStatus.OK).send(booking);
      } catch (error) {
        if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
}

export async function postBooking(req: AuthenticatedRequest, res: Response){
    const { roomId } = req.body;
    const userId = req.userId;
    try {
        const booking = await postBookingService(Number(userId), Number(roomId));
    
        res.status(httpStatus.OK).send(booking);
      } catch (error) {
        if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
        if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
}

export async function putBooking(req: AuthenticatedRequest, res: Response){
    const { roomId } = req.body;
    const { bookingId } = req.params;
    const userId = req.userId;
    try {
        const booking = await putBookingService(Number(bookingId), Number(roomId), Number(userId));
    
        res.status(httpStatus.OK).send(booking);
      } catch (error) {
        if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
        if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
}