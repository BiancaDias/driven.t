import { getTicketsTypesPrisma } from "@/repositories/tickets-repository";

export async function getTicketsTypesService(){
    return getTicketsTypesPrisma();
}