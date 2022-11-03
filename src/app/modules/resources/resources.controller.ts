import { Response, NextFunction } from 'express';
import * as service from './resources.service';
import { CustomRequest } from '../../types/express';

export const getResources = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await service.listResources();
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
