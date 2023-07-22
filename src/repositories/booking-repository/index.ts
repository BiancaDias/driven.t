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
    return await prisma.room.findFirst({
        where: {id: roomId},
    })
}

async function capacityPrisma(roomId: number){
    return await prisma.booking.findMany({
        where: {
            roomId,
          },
          include: {
            Room: true,
          },
    })
}

async function bookingByUser(userId: number){
    return await prisma.booking.findFirst({
        where: {userId}
    })
}
async function getTicketsPrisma(id: number) {
    return await prisma.ticket.findFirst({
      where: {
        Enrollment: {
          userId: id,
        },
      },
      include: {
        TicketType: true,
        Enrollment: true,
      },
    });
  }
export default {
    bookingByUser,
    capacityPrisma,
    verifyRoomPrisma,
    putBookingPrisma,
    postBookingPrisma,
    getBookingPrisma,
    getTicketsPrisma
}