import {
    getBooking,
    postBooking,
    putBooking
} from "@/controllers/booking-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingRouter = Router()

bookingRouter.use(authenticateToken);
bookingRouter.get('/', getBooking);
bookingRouter.post('/', postBooking);
bookingRouter.put('/:bookingId', putBooking);

export { bookingRouter };