import { notFoundError, requestError, unauthorizedError } from '@/errors';
import { Payment } from '@/protocols';
import { getPaymentsPrisma, getUserPrisma, postPaymentPrisma } from '@/repositories/payments-repository';
import { getTicketPrisma } from '@/repositories/tickets-repository';

export async function getPaymentsService(ticketId: number | null, userId: number) {
  if (!ticketId) throw requestError(ticketId, 'Não é possivel processar'); // retornar 400

  const ticketExist = await getTicketPrisma(ticketId);
  if (!ticketExist) throw notFoundError();

  const user = await getUserPrisma(ticketId, userId);
  if (!user) throw unauthorizedError();

  const ticket = await getPaymentsPrisma(ticketId);
  return ticket;
}

export async function postPaymentService(payment: Payment, userId: number) {
  if (!payment.ticketId || !payment.cardData) throw requestError(payment.ticketId, 'Não é possivel processar');
  const lastNumber = payment.cardData.number.toString().slice(-4);
  const ticketExist = await getTicketPrisma(payment.ticketId);
  if (!ticketExist) throw notFoundError();

  const user = await getUserPrisma(payment.ticketId, userId);
  if (!user) throw unauthorizedError();
  return postPaymentPrisma(payment.ticketId, payment.cardData.issuer, lastNumber);
}
