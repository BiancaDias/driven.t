import { notFoundError, requestError } from "@/errors";
import { getTicketsPrisma, getTicketsTypesPrisma, getUserPrisma, postTicketPrisma } from "@/repositories/tickets-repository";

export async function getTicketsTypesService(){
    return await getTicketsTypesPrisma();
}

export async function getTicketsService(id:number){
    return await getTicketsPrisma(id)

}
export async function postTicketService(userId: number, ticketTypeId: number){

    if(!ticketTypeId) throw requestError(ticketTypeId, "Não é possivel processar")

    const user = await getUserPrisma(userId)
    if(!user) throw notFoundError()
    await postTicketPrisma(userId, ticketTypeId)
    return getTicketsService(userId)
}
