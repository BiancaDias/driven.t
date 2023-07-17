import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsById } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.use(authenticateToken);
hotelsRouter.get('/', getHotels);
hotelsRouter.get('/:hotelId', getHotelsById);

export { hotelsRouter };
