import { prisma } from "@/config"

export async function getTicketsTypesPrisma(){
    return await prisma.ticketType.findMany();
}

export async function getTicketsPrisma(id: number){
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

export async function postTicketPrisma(userId: number, ticketTypeId: number){
    return await prisma.ticket.create({
        data:{
            status: "RESERVED",
            ticketTypeId,
            enrollmentId: userId
        }
    })
}