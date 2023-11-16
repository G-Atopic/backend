export type User = {
  name: string;
  email: string;
  password: string;
  photo: string | null;
};

export type DatabaseUser = Omit<User, 'password'> & { id: number };

export type UserPatch = Partial<User>;
