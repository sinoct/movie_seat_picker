interface LockRequest {
  screening_id: string;
  selected_seats: string[];
}

interface ReservationRequest {
  email: string;
  screening_id?: string;
  selected_seats?: string[];
  reservation_id?: string;
}

enum ReservationType {
  LOCKED = "LOCKED",
  RESERVED = "RESERVED",
  CANCELLED = "CANCELLED",
}

export { LockRequest, ReservationRequest, ReservationType };
