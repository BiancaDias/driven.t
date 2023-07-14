import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import { getHotelsByIdService, getHotelsService } from '@/services/hotels-service';

export async function getHotels(req:AuthenticatedRequest, res:Response){
    const userId = req.userId;
    try{
        const hotel = await getHotelsService(userId);
        res.status(httpStatus.OK).send(hotel)

    }catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'PaymentRequired') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getHotelsById(req:AuthenticatedRequest, res:Response){
    const userId = req.userId;
    const { hotelId } = req.params;
    try{
        const hotel = await getHotelsByIdService(Number(hotelId), userId);
        res.status(httpStatus.OK).send(hotel)

    }catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'PaymentRequired') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}