import { prisma } from "@/config";

async function getBookingPrisma(userId: number){
    return await prisma.booking.findFirst({
        where: {userId},
        include: {Room: true}
    })
}

async function postBookingPrisma(userId: number, roomId: number){
    return await prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

async function putBookingPrisma(bookingId: number, roomId: number){
    return await prisma.booking.update({
        where:{
            id: bookingId
        },
        data:{
            roomId
        }
    })
}

async function verifyRoomPrisma(roomId: number){
    return await prisma.room.findUnique({
        where: {id: roomId},
        include: {Booking: true}
    })
}

async function capacityPrisma(roomId: number){
    return await prisma.booking.findMany({
        where: {roomId}
    })
}

async function bookingByUser(userId: number){
    return await prisma.booking.findFirst({
        where: {userId}
    })
}

export default {
    bookingByUser,
    capacityPrisma,
    verifyRoomPrisma,
    putBookingPrisma,
    postBookingPrisma,
    getBookingPrisma
}