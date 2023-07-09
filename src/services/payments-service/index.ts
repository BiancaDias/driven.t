import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { getPaymentsPrisma } from "@/repositories/payments-repository";
import { getUserPrisma } from "@/repositories/tickets-repository";

export async function getPaymentsService(ticketId: number, userId: number){
    //if(!ticketId) throw requestError(ticketId, "Não é possivel processar"); // retornar 400

    const ticket = await getPaymentsPrisma(ticketId);
    if(!ticket) throw notFoundError();

    const user = await getUserPrisma(ticketId);
    if(userId !== user.userId) throw unauthorizedError();
    return ticket;
}