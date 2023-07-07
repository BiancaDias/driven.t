import { getTicketsPrisma, getTicketsTypesPrisma } from "@/repositories/tickets-repository";

export async function getTicketsTypesService(){
    return await getTicketsTypesPrisma();
}

export async function getTicketsService(id:number){
    return getTicketsPrisma(id)
}