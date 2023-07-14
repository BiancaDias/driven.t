import { prisma } from "@/config";

export async function getHotelsPrisma(){
    return prisma.hotel.findMany();
}

export async function getHotelsByIdPrisma(id: number){
    return prisma.hotel.findUnique({
        where: {id},
        include: {Rooms: true}        
    })
}
