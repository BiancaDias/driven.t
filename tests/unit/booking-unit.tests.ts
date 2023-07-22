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
      })

})