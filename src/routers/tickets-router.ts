import { Router } from "express";

const ticketRouter = Router();

ticketRouter.get("/tickets/types");
ticketRouter.get("/tickets");
ticketRouter.post("/tickets");

export default ticketRouter;