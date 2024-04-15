/*eslint  @typescript-eslint/no-unused-vars: ["warn", { "varsIgnorePattern": "next" }]*/

import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../types';
import {
  errorIsCustomError,
  errorIsKnex,
  errorIsValidationError,
} from '../utils';
import log from './requestLogger';
export const notFoundHandler = (req: Request, res: Response) => {
  log.requestLogger({ req, success: false });
  res.status(404).json({ message: 'Route not found!' });
};

export const errorHandler = async (
  err: Record<string, string>,
  req: Request,
  res: Response,
  // cant disabled no-unused-vars in eslint for _next
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const error: ErrorType.ErrorBody = {
    message: 'Something went wrong!',
    code: 500,
  };

  if (errorIsValidationError(err)) {
    error.message = err.message;
    error.code = 400;
  }

  if (errorIsKnex(err)) {
    if (req.params.stack === 'true') {
      error.KnexError = err;
    }
    error.message = 'Something went wrong with the database';
  }

  if (errorIsCustomError(err)) {
    error.message = err.message;
    error.code = err.code;
  }

  if (req.query.stack === 'true' && !errorIsCustomError(err)) {
    error.stack = err.stack;
  }

  log.requestLogger({ req, success: false });
  res.status(error.code).json(error);
};
