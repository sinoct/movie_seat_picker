interface unformattedSeat {
  id: string;
  row_number: number;
  seat_number: number;
}

interface formattedSeat {
  id: string;
  row_number: number;
  seat_number: number;
  availability: boolean;
}

export { unformattedSeat, formattedSeat };
