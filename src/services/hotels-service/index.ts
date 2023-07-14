import { notFoundError, paymentRequired } from "@/errors";
import { getHotelsByIdPrisma, getHotelsPrisma } from "@/repositories/hotels-repository";
import { getTicketsPrisma, verifyTicketPrisma } from "@/repositories/tickets-repository";

export async function getHotelsService(userId: number) {
    const ticket = await verifyTicketPrisma(userId);
    if(!ticket) throw notFoundError; //ja verifica inscrição e ticket
    if(ticket.Ticket[0].status === "RESERVED") throw paymentRequired();

    const ticketType = await getTicketsPrisma(ticket.Ticket[0].id)
    if(ticketType.TicketType.isRemote || !ticketType.TicketType.includesHotel) throw paymentRequired();

    const hotel = await getHotelsPrisma();
    if(!hotel) throw notFoundError();

    return hotel;
}

export async function getHotelsByIdService(idHotel:number, userId: number) {
    const ticket = await verifyTicketPrisma(userId);
    if(!ticket) throw notFoundError; //ja verifica inscrição e ticket
    if(ticket.Ticket[0].status === "RESERVED") throw paymentRequired();

    const ticketType = await getTicketsPrisma(ticket.Ticket[0].id)
    if(ticketType.TicketType.isRemote || !ticketType.TicketType.includesHotel) throw paymentRequired();

    const hotel = await getHotelsByIdPrisma(idHotel);
    if(!hotel) throw notFoundError();

    return hotel;
}