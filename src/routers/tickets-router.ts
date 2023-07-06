import { getTicketsTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter.get("/tickets/types",authenticateToken, getTicketsTypes);
ticketRouter.get("/tickets");
ticketRouter.post("/tickets");

export default ticketRouter;