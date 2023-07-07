import { getTickets, getTicketsTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter.use(authenticateToken)
ticketRouter.get("/tickets/types", getTicketsTypes);
ticketRouter.get("/tickets", getTickets);
ticketRouter.post("/tickets");

export default ticketRouter;