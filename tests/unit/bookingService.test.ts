import { getBookingService, postBookingService, putBookingService } from "@/services/booking-service";
import bookingRepository from "@/repositories/booking-repository"
import { buildUser } from "../factories";
import { buildBooking } from "../factories/booking-factory";
import { builHotelWithRooms } from "../factories/hotels-factory";
import { forbiddenError } from "@/errors";

describe("Rentals Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      })
      describe('GET /booking', () => {
        
        it("should return 200 and bookings", async () =>{
            const user = 1;
            const booking = buildBooking();
            jest.spyOn(bookingRepository, "getBookingPrisma").mockResolvedValueOnce(booking)

            const promise = await getBookingService(user);
            expect(promise).toEqual({
                id: 1,
                userId: expect.any(Number),
                roomId: expect.any(Number),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
                Room: {
                    id: expect.any(Number),
                    name: expect.any(String),
                    capacity: expect.any(Number),
                    hotelId: expect.any(Number),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }
            })
        })
        it("should return 404 when have no booking", async () => {
            const user = buildUser();
            jest.spyOn(bookingRepository, "getBookingPrisma").mockRejectedValueOnce({
              name: "NotFoundError",
              message: 'No result for this search!'
            });
          
            await expect(getBookingService(user.id)).rejects.toEqual({
              name: "NotFoundError",
              message: 'No result for this search!'
            });
          });
          
    })
    describe('POST /booking', () => {
        it("should return 404 when room dont exist", async () => {
            const user = buildUser();
            jest.spyOn(bookingRepository, "verifyRoomPrisma").mockRejectedValueOnce({
              name: "NotFoundError",
              message: 'No result for this search!'
            });
          
            await expect(postBookingService(user.id, 1)).rejects.toEqual({
              name: "NotFoundError",
              message: 'No result for this search!'
            });
          });
          
          it("should return 403 when ticket is RESERVED", async () => {
            const user = buildUser();
          
            jest.spyOn(bookingRepository, "verifyRoomPrisma").mockImplementation((): any => {
              return true;
            });
          
            jest.spyOn(bookingRepository, "getTicketsPrisma").mockImplementation((): any => {
              return {
                status: "RESERVED"
              };
            });
          
            jest.spyOn(bookingRepository, "capacityPrisma").mockImplementation((): any => {
              return [];
            });
          
            await expect(postBookingService(user.id, 1)).rejects.toEqual(forbiddenError());
          });
          
    })

    describe('PUT /booking', () => {
        it("should return 404 when room dont exist", async () => {
            const user = buildUser();
            jest.spyOn(bookingRepository, "bookingByUser").mockImplementation((): any => {
                return true;
              });
            jest.spyOn(bookingRepository, "verifyRoomPrisma").mockRejectedValueOnce({
              name: "NotFoundError",
              message: 'No result for this search!'
            });
          
            await expect(putBookingService(1, 1,user.id)).rejects.toEqual({
              name: "NotFoundError",
              message: 'No result for this search!'
            });
          });
          
          it("should return 403 when the usar has no reserve", async () => {
            const user = buildUser();
          
            jest.spyOn(bookingRepository, "bookingByUser").mockImplementation((): any => {
              return false;
            });
                 
            await expect(putBookingService(1, 1,user.id)).rejects.toEqual(forbiddenError());
          });
          
    })
})

