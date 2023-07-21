import {
    forbiddenError,
    notFoundError
} from "@/errors";
import {
    getBookingPrisma,
    postBookingPrisma,
    verifyRoomPrisma
} from "@/repositories/booking-repository";
import { Booking } from "@prisma/client";

export async function getBookingService(userId:number) { //verificar em teste unitario:
    const booking = await getBookingPrisma(userId);     // 2 casos: se tem reserva ou nao
    if(!booking) throw notFoundError();
    return booking;
}

export async function postBookingService(userId:number, roomId:number){
    const room = await verifyRoomPrisma(roomId);
    if(!room) throw notFoundError();
    if(room.capacity === 0) forbiddenError();
    return await postBookingPrisma(userId, roomId);
}

export async function putBookingService(bookingId:number, roomId:number): Promise<Booking>{
    const room = await verifyRoomPrisma(roomId);
    if(!room) throw notFoundError();
    if(room.capacity === 0) forbiddenError();
    return await putBookingService(bookingId, roomId);
}