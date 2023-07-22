import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Hotel, Room } from '@prisma/client';

export async function createHotel() {
  const numberOfRooms = Math.floor(Math.random() * 10) + 2;

  const hotel = await prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.imageUrl(),
    },
  });

  const rooms = [];

  for (let i = 0; i < numberOfRooms; i++) {
    const room = {
      name: faker.company.companyName(),
      capacity: Math.floor(Math.random() * 4) + 1,
      hotelId: hotel.id,
    };

    rooms.push(room);
  }

  await prisma.room.createMany({
    data: rooms,
  });

  const hotelWithRooms = await prisma.hotel.findUnique({
    where: {
      id: hotel.id,
    },
    include: {
      Rooms: true,
    },
  });

  return hotelWithRooms;
}

export function builHotelWithRooms(): Hotel & { Rooms: Room[] } {
  const date = new Date();
  const hotel: Hotel = {
    id: 1,
    name: faker.company.companyName(),
    image: faker.image.imageUrl(),
    createdAt: date,
    updatedAt: date,
  };

  const quarto1: Room = {
    id: 1,
    name: faker.company.companyName(),
    capacity: 3,
    hotelId: hotel.id,
    createdAt: date,
    updatedAt: date,
  };

  const quarto2: Room = {
    id: 2,
    name: faker.company.companyName(),
    capacity: 2,
    hotelId: hotel.id,
    createdAt: date,
    updatedAt: date,
  };

  return {
    ...hotel,
    Rooms: [quarto1, quarto2],
  };
}
