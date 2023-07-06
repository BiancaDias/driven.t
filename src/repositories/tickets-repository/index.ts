import { prisma } from "@/config"

export async function getTicketsTypesPrisma(){
    return await prisma.ticketType.findMany();
}