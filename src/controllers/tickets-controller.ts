import { AuthenticatedRequest } from "@/middlewares";
import { getTicketsService, getTicketsTypesService } from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res:Response){
    try{
        const tickets = await getTicketsTypesService();
        res.status(httpStatus.OK).send(tickets)
    }catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
}

export async function getTickets(req: AuthenticatedRequest, res:Response){
    const userId = req.userId
    try{
        const ticket = await getTicketsService(userId)
        if(!ticket) return res.sendStatus(httpStatus.NOT_FOUND)
        res.status(httpStatus.OK).send(ticket)
    }catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
}