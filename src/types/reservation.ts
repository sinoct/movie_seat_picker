interface ReservationRequest {
  email: string;
  screening_id: string;
  selected_seats: string[];
  type: ReservationType;
  reservation_id?: string;
}

enum ReservationType {
  LOCKED = "LOCKED",
  RESERVE = "RESERVED",
  CANCELLED = "CANCELLED",
}

export { ReservationRequest, ReservationType };
