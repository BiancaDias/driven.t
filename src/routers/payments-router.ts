import { getPayments, postPayments } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get('/', getPayments);
paymentsRouter.post('/process', postPayments)

export default paymentsRouter;