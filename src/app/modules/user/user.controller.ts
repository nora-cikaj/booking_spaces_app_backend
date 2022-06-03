import { Response, NextFunction } from 'express';
import * as service from './user.service';
import { CustomRequest } from '../../types/express';

export const getUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await service.listUsers();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};
export const createUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const requestBody = req.body;
  try {
    const createdUser = await service.createUser({ requestBody });
    res.status(201).send(createdUser);
  } catch (e) {
    next(e);
  }
};

export const getSingleUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await service.getSingleUser({ id });
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};
