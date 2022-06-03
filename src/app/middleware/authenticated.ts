import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/express';
import { NotAuthenticated } from '../utils/errors';

const authenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new NotAuthenticated('');
    next();
  } catch (e) {
    next(e);
  }
};

export default authenticated;
