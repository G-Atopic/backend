export type KnexError = {
  errno: unknown;
  code: unknown;
  stack?: string;
};

export type ErrorBody = {
  message: string;
  stack?: string;
  KnexError?: KnexError;
  code: number;
};

export type CustomError = {
  message: string;
  code: number;
  _custom?: true;
};
