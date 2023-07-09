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
