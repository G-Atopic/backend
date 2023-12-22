import { ErrorType } from '../types';
import { ValidationError } from 'yup';
const errorConstructor = (
  error: ErrorType.CustomError,
): ErrorType.CustomError => ({
  message: error.message,
  code: error.code,
  isCustomError: true,
});

const errorIsCustomError = (err: unknown): err is ErrorType.CustomError => {
  return (err as ErrorType.CustomError).isCustomError !== undefined;
};

const errorIsKnex = (err: unknown): err is ErrorType.KnexError => {
  return (err as ErrorType.KnexError).errno !== undefined;
};
const errorIsErrorClass = (err: unknown): err is Error => {
  return err instanceof Error;
};
const errorIsValidationError = (err: unknown): err is Error => {
  return err instanceof ValidationError;
};

export {
  errorIsValidationError,
  errorIsCustomError,
  errorIsKnex,
  errorIsErrorClass,
  errorConstructor,
};
