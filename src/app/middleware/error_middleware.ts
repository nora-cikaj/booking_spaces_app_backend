import Util from 'util';

import { getLogger } from '../config/logger';
import { GeneralError, InternalError } from '../utils/errors';

/**
 * Express error handling middleware
 */

export default (err, req?, res?, next?) => {
  let fullPath = null;
  let error = err;

  if (req?.originalUrl && req?.method) {
    fullPath = `${req.method} ${req.originalUrl}`;
  }

  if (!(err instanceof GeneralError)) {
    error = new InternalError(typeof (err) === 'object' ? Util.inspect(err) : err);
  }

  error.setPath(fullPath);

  getLogger().error(error.printForLogging());

  if (res?.headersSent) {
    next(err); // pass error to default express handler

    return;
  }

  if (!error.logOnly) {
    res?.status(error.getCode()).json(error.printForHTTPResponse());
  }
};
