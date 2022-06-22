import { PrismaClient } from '@prisma/client';
import rawQuery from '../../utils/raw_query';

const prisma = new PrismaClient();

export const listBookings = async ({ query = {} }: { query?: any }): Promise<any> => {
  const response = await prisma.booking.findMany({ where: query, include: { attendees: true } });
  return response;
};
export const createBooking = async ({ data }): Promise<any> => {
  const response = await prisma.booking.create({ data, include: { attendees: true } });
  return response;
};

export const getBooking = async ({ query }): Promise<any> => {
  const response = await prisma.booking.findFirst({ where: query, include: { attendees: true } });
  return response;
};

export const updateBooking = async ({ query, data }): Promise<any> => {
  const response = await prisma.booking.update({
    where: query,
    data,
    include: { attendees: true },
  });
  return response;
};

export const deleteBooking = async ({ query }): Promise<any> => {
  const response = await prisma.booking.delete({
    where: query,
    include: { attendees: true },
  });
  return response;
};

export const findOverlaping = async ({ query }): Promise<any> => {
  const response = await rawQuery({ query });
  return response;
};

export const deletePreviewsAttendees = async ({ query }): Promise<void> => {
  await prisma.bookingUser.deleteMany({ where: query });
};
