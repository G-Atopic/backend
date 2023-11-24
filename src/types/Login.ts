type BinaryPassword = {
  buttons: number[][];
  binaryPassword: number[];
};

export type ValidateLoginParams = BinaryPassword & {
  databasePassword: string;
};

export type UserLoginParams = BinaryPassword & {
  email: string;
};
