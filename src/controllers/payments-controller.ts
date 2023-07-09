import { AuthenticatedRequest } from "@/middlewares";
import { getPaymentsService } from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export function getPayments(req: AuthenticatedRequest, res: Response){
    const ticketId = req.query.ticketId;
    const userId = req.userId;
    if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)
    try{
        const ticketPayment = getPaymentsService(Number(ticketId), Number(userId))
        res.status(httpStatus.OK).send(ticketPayment)
    }catch(error){
        if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
        if (error.name === 'RequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}