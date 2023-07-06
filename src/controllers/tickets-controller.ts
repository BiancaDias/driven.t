import { getTicketsTypesService } from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res:Response){
    try{
        const tickets = getTicketsTypesService();
        res.status(httpStatus.OK).send(tickets)
    }catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
}