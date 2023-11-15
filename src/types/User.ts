export type User = {
  name: string;
  email: string;
  password: string;
  photo?: string;
};

export type DatabaseUser = Omit<User, 'password'> & { id: number };

export type UserUpdate = Partial<User>;
