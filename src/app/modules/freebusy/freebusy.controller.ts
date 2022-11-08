import { Response, NextFunction } from 'express';
import * as service from './freebusy.service';
import { CustomRequest } from '../../types/express';

export const getFreeBusyList = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await service.listFreeBusy(
      req.body.timeMin,
      req.body.timeMax,
    );
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
