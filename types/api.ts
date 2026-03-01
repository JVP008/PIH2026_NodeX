export interface BookingPayload {
  contractor_id: string | number;
  date: string;
  time: string;
  notes?: string;
  status?: string;
  price?: number | string;
  user_id?: string;
}

export interface DisputePayload {
  booking_id?: string;
  name?: string;
  email?: string;
  type: string;
  description: string;
  user_id?: string;
}

export interface JobPayload {
  user_id?: string;
  title?: string;
  service?: string;
  category?: string;
  description: string;
  location: string;
  budget?: string;
  status?: string;
  urgency?: string;
}

export interface GenerateDescPayload {
  title?: string;
  service: string;
  location: string;
}
