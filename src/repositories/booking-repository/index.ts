import { prisma } from "@/config";

export async function getBookingPrisma(userId: number){
    return await prisma.booking.findFirst({
        where: {userId},
        include: {Room: true}
    })
}

export async function postBookingPrisma(userId: number, roomId: number){
    return await prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

export async function putBookingPrisma(bookingId: number, roomId: number){
    return await prisma.booking.update({
        where:{
            id: bookingId
        },
        data:{
            roomId
        }
    })
}

export async function verifyRoomPrisma(roomId: number){
    return await prisma.room.findUnique({
        where: {id: roomId},
        include: {Booking: true}
    })
}

export async function capacityPrisma(roomId: number){
    return await prisma.booking.findMany({
        where: {roomId}
    })
}

export async function bookingByUser(userId: number){
    return await prisma.booking.findFirst({
        where: {userId}
    })
}