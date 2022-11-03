import { Response, NextFunction } from 'express';
import * as service from './users.service';
import { CustomRequest } from '../../types/express';

export const getUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await service.listUsers();
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
