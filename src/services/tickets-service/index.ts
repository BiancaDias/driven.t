import { notFoundError } from "@/errors";
import { getTicketsPrisma, getTicketsTypesPrisma, getUserPrisma, postTicketPrisma } from "@/repositories/tickets-repository";

export async function getTicketsTypesService(){
    return await getTicketsTypesPrisma();
}

export async function getTicketsService(id:number){
    return await getTicketsPrisma(id)

}
export async function postTicketService(userId: number, ticketTypeId: number){
    const user = await getUserPrisma(userId)
    if(!user) throw notFoundError()
    return await postTicketPrisma(userId, ticketTypeId)
}
