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

export function buildBooking(userId: number, roomId: number): Booking & { Room: Room } {
    const date = new Date();
    const room: Room = {
      id: roomId,
      name: faker.company.companyName(),
      capacity: 3,
      hotelId: 1,
      createdAt: date,
      updatedAt: date,
    };
  
    return {
      id: 1,
      userId,
      roomId,
      createdAt: date,
      updatedAt: date,
      Room: room
    };
  }
  