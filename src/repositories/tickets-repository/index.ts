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
        },
        include: {
            TicketType: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
          }
    })
}

export async function getUserPrisma(userId:number){
  return await prisma.ticket.findUnique({
    where:{
      id: userId
    }
  })
}