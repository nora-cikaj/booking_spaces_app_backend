import { Response, NextFunction } from 'express';
import * as service from './user.service';
import { CustomRequest } from '../../types/express';
import { CreateUserRequestBody } from './user.types';

export const getLoggedInUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req;
  try {
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

export const upsertUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const requestBody: CreateUserRequestBody = req.body;
  try {
    const createdUser = await service.upsertUser({ requestBody });
    res.status(200).send(createdUser);
  } catch (e) {
    next(e);
  }
};
