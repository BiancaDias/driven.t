import { prisma } from "@/config"
import faker from "@faker-js/faker"

export async function createHotel() {
    const numberOfRooms = Math.floor(Math.random() * 10) + 1;
  
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