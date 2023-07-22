import { getBookingService } from "@/services/booking-service";
import bookingRepository from "../repositories/booking-repository/index"
import { buildUser } from "../factories";
import { buildBooking } from "../factories/booking-factory";
import { builHotelWithRooms } from "../factories/hotels-factory";

describe("Rentals Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      })
      describe('GET /booking', () => {
        
        it("should return 200 and bookings", async () =>{
            const user = buildUser()
            const hotel = builHotelWithRooms()
            const booking = buildBooking(user.id, hotel.Rooms[0].id)
            jest.spyOn(bookingRepository, "getBookingPrisma").mockResolvedValueOnce(booking)

            const promise = await getBookingService(user.id);
            expect(promise).toEqual({
                id: 1,
                userId: user.id,
                roomId: hotel.Rooms[0].id,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                Room: {
                    id: hotel.Rooms[0].id,
                    name: expect.any(String),
                    capacity: 3,
                    hotelId: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }
            })
        })
        it("should return 404 when have no booking", async () =>{
            const user = buildUser()
            jest.spyOn(bookingRepository, "getBookingPrisma").mockResolvedValueOnce(null)

            const promise = await getBookingService(user.id);
            expect(promise).rejects.toEqual({
                name: "NotFoundError",
                message: 'No result for this search!'
              })
        })
    })
    describe('POST /booking', () => {
        it("should return 404 when room dont exist", async () =>{
            const user = buildUser()
            jest.spyOn(bookingRepository, "verifyRoomPrisma").mockResolvedValueOnce(null)

            const promise = await getBookingService(user.id);
            expect(promise).rejects.toEqual({
                name: "NotFoundError",
                message: 'No result for this search!'
              })
        })
        it("should return 403 when ticket is remote", async () =>{
            const user = buildUser()
            jest.spyOn(bookingRepository, "verifyRoomPrisma").mockImplementation((): any =>{
                return true
            })

            jest.spyOn(bookingRepository, "getTicketsPrisma").mockImplementation((): any =>{
                return {
                    status: "RESERVED"
                }
            })
            const promise = await getBookingService(user.id);
            expect(promise).rejects.toEqual({
                name: "ForbiddenError",
                message: 'forbidden!'
              })
        })
    })
})