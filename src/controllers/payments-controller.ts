import { AuthenticatedRequest } from "@/middlewares";
import { Payment } from "@/protocols";
import { getPaymentsService, postPaymentService } from "@/services/payments-service";
import { Response, Request } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response){
    const ticketId = req.query.ticketId;
    const userId = req.userId;
    try{
        const ticketPayment= await getPaymentsService(Number(ticketId), Number(userId))
      
        res.status(httpStatus.OK).send(ticketPayment)
    }catch(error){
        if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND)
        if (error.name === 'RequestError') return res.sendStatus(httpStatus.BAD_REQUEST)
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

export async function postPayments(req: AuthenticatedRequest, res: Response){
    const {ticketId, cardData} = req.body
    const userId = req.userId;
    //if(!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST)
    try{
        const successPayment = await postPaymentService({ticketId, cardData}, userId);
        res.status(httpStatus.OK).send(successPayment)
    }catch(error){
        if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND)
        if (error.name === 'RequestError') return res.sendStatus(httpStatus.BAD_REQUEST)
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}