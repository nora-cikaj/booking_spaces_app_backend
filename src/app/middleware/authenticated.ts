import { NextFunction, Response } from 'express';
import errors from '../constants/errors';
import { CustomRequest } from '../types/express';
import { NotAuthenticated } from '../utils/errors';

const authenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new NotAuthenticated(errors.AUTH.NOT_AUTHENTICATED);
    next();
  } catch (e) {
    next(e);
  }
};

export default authenticated;
