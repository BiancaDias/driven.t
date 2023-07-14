import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createUser, createTicketType, createTicket, createTicketTypeRemoteOrHotel } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';


beforeAll(async () => {
    await init();
  });
  
beforeEach(async () => {
        await cleanDb();
});

const server = supertest(app);


describe('GET /hotels', () => {
    //Retorna status 401 ao enviar token inválido?
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
    
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    //Retorna 402 se ticket não foi pago?
    it('should respond with status 402 if ticket as not pay', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketType();
        const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });
    //Retorna 402 se o tipo do ticket for remoto?
    it('should respond with status 402 if ticket is remote', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeRemoteOrHotel(true, false);
        const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });
})

describe('GET /hotels/:hotelId', () => {
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
    
        const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
})