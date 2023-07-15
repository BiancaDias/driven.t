import { notFoundError, paymentRequired } from "@/errors";
import { findEnrollmentByUserId } from "@/repositories/enrollment-repository";
import { getHotelsByIdPrisma, getHotelsPrisma } from "@/repositories/hotels-repository";
import { getTicketsPrisma } from "@/repositories/tickets-repository";

export async function getHotelsService(userId: number) {
    const enrollment = await findEnrollmentByUserId(userId);
    if(!enrollment) throw notFoundError()
    const ticket = await getTicketsPrisma(userId);
    if(!ticket) throw notFoundError();
    if(ticket.status === "RESERVED") throw paymentRequired();

    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel ) throw paymentRequired();

    const hotel = await getHotelsPrisma();
    if(hotel.length === 0) throw notFoundError();

    return hotel;
}

export async function getHotelsByIdService(idHotel:number, userId: number) {
    const ticket = await getTicketsPrisma(userId);
    if(!ticket) throw notFoundError; //ja verifica inscrição e ticket
    if(ticket.status === "RESERVED") throw paymentRequired();

    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel ) throw paymentRequired();

    const hotel = await getHotelsByIdPrisma(idHotel);
    if(hotel) throw notFoundError();

    return hotel;
}