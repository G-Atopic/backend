import { ErrorType } from '../types';

const errorConstructor = (
  error: ErrorType.CustomError,
): ErrorType.CustomError => ({
  message: error.message,
  code: error.code,
});

const errorIsCustomError = (err: unknown): err is ErrorType.CustomError => {
  return (err as ErrorType.CustomError).code !== undefined;
};

const errorIsKnex = (err: unknown): err is ErrorType.KnexError => {
  return (err as ErrorType.KnexError).errno !== undefined;
};

const errorIsErrorClass = (err: unknown): err is Error => {
  return err instanceof Error;
};

export { errorIsCustomError, errorIsKnex, errorIsErrorClass, errorConstructor };
