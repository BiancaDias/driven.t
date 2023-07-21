import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createTicketTypeRemoteOrHotel,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { createHotel } from '../factories/hotels-factory';
import app, { init } from '@/app';
import { createBooking } from '../factories/booking-factory';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});
const server = supertest(app);
describe('GET /booking', () => {
    it('should respond with status 404 awhen the user dont have a booking', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeRemoteOrHotel(false, true);
        await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
        const hotel = await createHotel();

        const response = await server.get(`/booking`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })
    it('should respond with status 200 awhen the user have booking', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeRemoteOrHotel(false, true);
        await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
        const hotel = await createHotel();
        const booking = await createBooking(user.id, hotel.Rooms[0].id)

        const response = await server.get(`/booking`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                createdAt: expect.any(String),
                id: expect.any(Number),
                roomId: expect.any(Number),
                userId: expect.any(Number),
                updatedAt: expect.any(String),
              }),
            ]),
            );
    })
})