import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/express';
import { NotAuthorized } from '../utils/errors';

const authorized = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user.admin) throw new NotAuthorized('');
    next();
  } catch (e) {
    next(e);
  }
};

export default authorized;
