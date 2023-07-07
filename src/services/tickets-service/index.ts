import { getTicketsPrisma, getTicketsTypesPrisma, postTicketPrisma } from "@/repositories/tickets-repository";

export async function getTicketsTypesService(){
    return await getTicketsTypesPrisma();
}

export async function getTicketsService(id:number){
    return await getTicketsPrisma(id)

}
export async function postTicketService(userId: number, ticketTypeId: number){
    return await postTicketPrisma(userId, ticketTypeId)
}