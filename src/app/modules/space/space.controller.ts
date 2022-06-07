import { Response, NextFunction } from 'express';
import * as service from './space.service';
import { CustomRequest } from '../../types/express';
import { CreateSpaceRequestBody } from './space.types';

export const createSpace = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const requestBody: CreateSpaceRequestBody = req.body;
  const { user } = req;
  try {
    const space = await service.createSpace({ requestBody, user });
    res.status(201).send(space);
  } catch (e) {
    next(e);
  }
};

export const getSpace = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const space = await service.getSpace({ id });
    res.status(200).send(space);
  } catch (e) {
    next(e);
  }
};

export const listSpaces = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const spaces = await service.listSpaces();
    res.status(200).send(spaces);
  } catch (e) {
    next(e);
  }
};

export const updateSpace = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const requestBody = req.body;

  try {
    await service.updateSpace({ id, requestBody });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export const deleteSpace = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  try {
    await service.deleteSpace({ id });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
