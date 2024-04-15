import { ErrorType } from '../types';
import { ValidationError } from 'yup';
const errorConstructor = (
  error: ErrorType.CustomError,
): ErrorType.CustomError => ({
  message: error.message,
  code: error.code,
  _custom: true,
});

const errorIsCustomError = (err: unknown): err is ErrorType.CustomError => {
  return (err as ErrorType.CustomError)._custom || false;
};

const errorIsKnex = (err: unknown): err is ErrorType.KnexError => {
  return (err as ErrorType.KnexError).code === 'SQLITE_ERROR';
};
const errorIsValidationError = (err: unknown): err is Error => {
  return err instanceof ValidationError;
};

export {
  errorIsValidationError,
  errorIsCustomError,
  errorIsKnex,
  errorConstructor,
};
