/*eslint  @typescript-eslint/no-unused-vars: ["warn", { "varsIgnorePattern": "next" }]*/

import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../types';
import { errorIsCustomError, errorIsErrorClass, errorIsKnex } from '../utils';

export const notFoundHanlder = (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found!' });
};

export const errorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const error: ErrorType.ErrorBody = {
    message: 'Something went wrong!',
    code: 500,
  };

  if (errorIsErrorClass(err)) {
    if (req.query.stack === 'true') {
      error.message = err.message;
      error.stack = err.stack;
    }
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

  res.status(error.code).json(error);
};
