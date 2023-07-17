import { Router } from 'express';
import { getTickets, getTicketsTypes, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();

ticketRouter.use(authenticateToken);
ticketRouter.get('/types', getTicketsTypes);
ticketRouter.get('/', getTickets);
ticketRouter.post('/', postTicket);

export { ticketRouter };
