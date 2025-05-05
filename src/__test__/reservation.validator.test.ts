import { validateReservationRequest } from "../middlewares/validators/reservationValidator";
import { getReservation } from "../services/reservationsService";
import { ReservationRequest, ReservationType } from "../types/reservation";
import { checkSeatAvailability } from "../utils/reservation";
import { Request, Response, NextFunction } from "express";
import { createRequest, createResponse } from "node-mocks-http";

jest.mock("../services/reservationsService", () => ({
  getReservation: jest.fn(),
}));

jest.mock("../utils/reservation", () => ({
  checkSeatAvailability: jest.fn(),
  checkForEmptySingleSeat: jest.fn(),
}));

describe("validateReservationRequest", () => {
  let req: Request<unknown, unknown, ReservationRequest>;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = createRequest({
      method: "POST",
      body: {
        email: "",
      },
    });

    res = createResponse();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    next = jest.fn();
  });

  it("should return 400 if request body is invalid", async () => {
    req.body = { email: "test@test.com" };

    await validateReservationRequest(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid request body" });
  });

  it("should return 404 if reservation is not found", async () => {
    req.body = {
      email: "test@test.com",
      reservation_id: "mock_id",
    };
    (getReservation as jest.Mock).mockResolvedValue(null);

    await validateReservationRequest(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Reservation not found" });
  });

  it("should return 400 if reservation is cancelled", async () => {
    req.body = {
      email: "test@test.com",
      reservation_id: "mock_id",
    };
    (getReservation as jest.Mock).mockResolvedValue({
      status: ReservationType.CANCELLED,
    });

    await validateReservationRequest(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Reservation was cancelled",
    });
  });

  it("should return 400 if seats are already reserved", async () => {
    req.body = {
      email: "test@test.com",
      selected_seats: ["mock_id"],
      screening_id: "mock_id",
    };

    (checkSeatAvailability as jest.Mock).mockResolvedValue([
      [
        [
          {
            id: "mock_id",
            row_number: 0,
            seat_number: 1,
            availability: false,
          },
          {
            id: "mock_id2",
            row_number: 0,
            seat_number: 2,
            availability: false,
          },
        ],
      ],
    ]);

    await validateReservationRequest(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "One or more seats taken",
    });
  });

  it("should call next if validation is successful", async () => {
    req.body = {
      email: "test@example.com",
      reservation_id: "mock_id",
    };
    (getReservation as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      status: ReservationType.LOCKED,
    });

    await validateReservationRequest(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });
});
