import { Response, NextFunction, Request } from 'express';
import * as service from './event.service';
import { CustomRequest } from '../../types/express';

export const listEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await service.listEvents();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await service.createEvent(req.body.event);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await service.updateEvent(req.body.event, req.params.id, req.body.email);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const deleteEvent = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await service.deleteEvent(req.params.id, req.body.email);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
