import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Booking, Room } from '@prisma/client';

export async function createBooking(userId: number, roomId: number){
    return await prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

export function buildBooking(): Booking & { Room: Room } {
    
    return {
      id: 1,
      userId: 2,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: faker.company.companyName(),
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }}
  