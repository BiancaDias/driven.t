import { prisma } from "@/config";
import { Payment } from "@prisma/client";

export async function getPaymentsPrisma(ticketId: number): Promise<Payment> | null{
    return await prisma.payment.findFirst({
      where: {
        ticketId
      },
    });
  }


export async function getUserPrisma(ticketId: number){
  return await prisma.ticket.findFirst({
    where:{
      id: ticketId
    },
    include:{
      Enrollment: true
    }
  })
}