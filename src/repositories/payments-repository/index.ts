import { prisma } from "@/config";


export async function getPaymentsPrisma(ticketId: number) {
    return await prisma.payment.findFirst({
      where: {
        ticketId
      }
    })
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