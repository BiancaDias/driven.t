import { prisma } from "@/config";
import { Enrollment, Ticket } from "@prisma/client";


export async function getPaymentsPrisma(ticketId: number) {
    return await prisma.payment.findFirst({
      where: {
        ticketId
      }
    })
  }

export async function getUserPrisma(ticketId: number, userId:number): Promise<Ticket | null> {
  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
      Enrollment: {userId}
    }
  });

  if (ticket) {
    return ticket
  }

  return null;
}

export async function postPaymentPrisma(ticketId: number, cardIssuer: string, cardLastDigits: string){
  const ticket =  await prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
  await prisma.ticket.update({
    where:{
      id: ticketId
    },
    data:{
      status: "PAID"
    }
  })
  const value = ticket.TicketType.price
  return await prisma.payment.create({
    data:{
      ticketId,
      value,
      cardIssuer,
      cardLastDigits
    }
  })
}
