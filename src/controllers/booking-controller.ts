import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getBookingService, postBookingService, putBookingService } from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const booking = await getBookingService(Number(userId));

    res.status(httpStatus.OK).send(booking);
      
}

export async function postBooking(req: AuthenticatedRequest, res: Response){
    const { roomId } = req.body;
    const userId = req.userId;
  
    const booking = await postBookingService(Number(userId), Number(roomId));

    res.status(httpStatus.OK).send(booking);
      
}

export async function putBooking(req: AuthenticatedRequest, res: Response){
    const { roomId } = req.body;
    const { bookingId } = req.params;
    const userId = req.userId;

    const booking = await putBookingService(Number(bookingId), Number(roomId), Number(userId));

    res.status(httpStatus.OK).send(booking);

}