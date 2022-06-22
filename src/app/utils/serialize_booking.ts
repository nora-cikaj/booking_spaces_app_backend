import { Booking } from '../modules/booking/booking.types';

const serializeBooking = (booking: Booking) => JSON.parse(JSON.stringify(booking, (key, value) => (typeof value === 'bigint'
  ? parseInt(value.toString(), 10)
  : value)));

export default serializeBooking;
