import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { getPaymentsPrisma } from "@/repositories/payments-repository";
import { getTicketPrisma, getUserPrisma } from "@/repositories/tickets-repository";

export async function getPaymentsService(ticketId: number | null, userId: number){
    if(!ticketId) throw requestError(ticketId, "Não é possivel processar"); // retornar 400

    const ticketExist = await getTicketPrisma(ticketId);
    if(!ticketExist) throw notFoundError();

    const user = await getUserPrisma(ticketId);
    if(userId !== user.userId) throw unauthorizedError();

    const ticket = await getPaymentsPrisma(ticketId);
    return ticket;
}