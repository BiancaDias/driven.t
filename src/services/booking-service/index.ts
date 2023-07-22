import {
    forbiddenError,
    notFoundError
} from "@/errors";
import {
    bookingByUser,
    capacityPrisma,
    getBookingPrisma,
    postBookingPrisma,
    putBookingPrisma,
    verifyRoomPrisma
} from "@/repositories/booking-repository";
import { getTicketsPrisma } from "@/repositories/tickets-repository";
import { Booking } from "@prisma/client";

export async function getBookingService(userId:number) { //verificar em teste unitario:
    const booking = await getBookingPrisma(userId);     // 2 casos: se tem reserva ou nao
    if(!booking) throw notFoundError();
    return booking;
}

export async function postBookingService(userId:number, roomId:number){
    const room = await verifyRoomPrisma(roomId);
    if(!room) throw notFoundError();

    const booking =  await capacityPrisma(roomId)
    if(room.capacity === booking.length) forbiddenError();

    const ticket = await getTicketsPrisma(userId);
    if (!ticket) throw notFoundError();
    if (ticket.status === 'RESERVED') throw forbiddenError();
  
    if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw forbiddenError();
    const bookingRoom = await postBookingPrisma(userId, roomId);
    return {bookingId: bookingRoom.id}
}

export async function putBookingService(bookingId:number, roomId:number, userId:number){
    const bookingUser = bookingByUser(userId)
    if(!bookingUser) throw forbiddenError();
    const room = await verifyRoomPrisma(roomId);
    if(!room) throw notFoundError();
    const booking =  await capacityPrisma(roomId)
    if(room.capacity === booking.length) forbiddenError();
    const bookingRoom = await putBookingPrisma(bookingId, roomId);
    return {bookingId: bookingRoom.id}
}