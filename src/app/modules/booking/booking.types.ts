import {
  Booking as BookingType,
  BookingUser as BookingUserType,
} from '@prisma/client';

export interface BookingUser extends BookingUserType { }

export interface Booking extends BookingType { user: true }

export type CreateBookingRequestBody = {
  title: string;
  description?: string;
  bookingType: string;
  spaceId: number;
  fromTime: number;
  toTime: number;
  repeat: boolean;
  interval?: number;
  endBy?: number | null;
  attendees?: any,
}

export type UpdateBookingRequestBody = {
  title: string;
  description?: string;
  bookingType: string;
  spaceId: number;
  fromTime: number;
  toTime: number;
  repeat?: boolean;
  interval?: number;
  endBy?: number;
  attendees?: any,
}
