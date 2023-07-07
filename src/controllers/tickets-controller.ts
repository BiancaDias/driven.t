import { AuthenticatedRequest } from "@/middlewares";
import { getTicketsService, getTicketsTypesService, postTicketService } from "@/services/tickets-service";
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

export async function getTickets(req: AuthenticatedRequest, res:Response){ //se passar no avaliador, depois tipa ela

    const userId = req.userId
    try{
        const ticket = await getTicketsService(userId)
        if(!ticket) return res.sendStatus(httpStatus.NOT_FOUND)
        res.status(httpStatus.OK).send({
            id: ticket.id,
            status: ticket.status,
            ticketTypeId: ticket.ticketTypeId,
            enrollmentId: ticket.enrollmentId,
            TicketType: {
              id: ticket.TicketType.id,
              name: ticket.TicketType.name,
              price: ticket.TicketType.price,
              isRemote: ticket.TicketType.isRemote,
              includesHotel: ticket.TicketType.includesHotel,
              createdAt: ticket.TicketType.createdAt,
              updatedAt: ticket.TicketType.updatedAt,
            },
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        })
    }catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
}

export async function postTicket(req: AuthenticatedRequest, res:Response){
    const userId = req.userId
    const { ticketTypeId } = req.body
    try{
        if(!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST)
        const tickets = await postTicketService(userId, ticketTypeId);
        res.status(httpStatus.CREATED).send(tickets)
    }catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
}
