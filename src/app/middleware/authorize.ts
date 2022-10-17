import { NextFunction, Response } from 'express';
import errors from '../constants/errors';
import { CustomRequest } from '../types/express';
import { NotAuthorized } from '../utils/errors';

const authorized = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user.admin) throw new NotAuthorized(errors.AUTH.NOT_AUTHORIZED);
    next();
  } catch (e) {
    next(e);
  }
};

export default authorized;
