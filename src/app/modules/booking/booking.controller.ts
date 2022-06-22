import { Response, NextFunction } from 'express';
import { CustomRequest } from '../../types/express';
import * as service from './booking.service';
import serializeBooking from '../../utils/serialize_booking';

export const listBookings = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { month, year } = req.query;

  try {
    const result = await service.listBookings({ month, year });
    const bookings = [];
    result.forEach((booking) => bookings.push(serializeBooking(booking)));
    res.status(200).send(bookings);
  } catch (e) {
    next(e);
  }
};

export const createBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const requestBody = req.body;
  const { user } = req;

  try {
    const booking = await service.createBooking({ requestBody, user });
    res.status(201).send(serializeBooking(booking));
  } catch (e) {
    next(e);
  }
};

export const getBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const booking = await service.getBooking({ id });
    res.status(200).send(serializeBooking(booking));
  } catch (e) {
    next(e);
  }
};

export const updateBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req;
  const id = parseInt(req.params.id, 10);
  const { item, start, end } = req.query;
  const requestBody = req.body;

  try {
    await service.updateBooking({
      id, requestBody, user, item, start, end,
    });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export const deleteBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req;
  const { item, start, end } = req.query;
  const id = parseInt(req.params.id, 10);

  try {
    const result = await service.deleteBooking({
      id, user, item, start, end,
    });
    const bookings = [];
    result.forEach((booking) => bookings.push(serializeBooking(booking)));
    res.status(200).send(bookings);
  } catch (e) {
    next(e);
  }
};
