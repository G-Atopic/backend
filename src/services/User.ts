import { User } from '../repositories';
import { UserType } from '../types';
import bcrypt from 'bcrypt';
import { errorConstructor } from '../utils';

const getUser = async (userId: number): Promise<UserType.DatabaseUser> => {
  const user = await User.findById(userId);
  if (!user) throw errorConstructor({ message: 'User not found', code: 400 });

  return user;
};

const createUser = async (
  userData: UserType.User,
): Promise<UserType.DatabaseUser> => {
  const password = await bcrypt.hash(userData.password, 10);
  const emailAlreadyExists = await User.findByEmail(userData.email);
  if (emailAlreadyExists) {
    throw errorConstructor({ message: 'Email already exists', code: 400 });
  }
  const newUser = await User.create({ ...userData, password });

  return newUser[0];
};

const updateUser = async (
  userId: number,
  userData: UserType.UserPatch,
): Promise<UserType.DatabaseUser> => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  if (userData.email) {
    const emailAlreadyExists = await User.findByEmail(userData.email);
    console.log({ emailAlreadyExists });
    if (emailAlreadyExists) {
      throw errorConstructor({ message: 'Email already exists', code: 400 });
    }
  }
  const user = await User.update(userId, userData);

  if (!user[0]) {
    throw errorConstructor({ message: 'User not found', code: 400 });
  }
  return user[0];
};

const deleteUser = async (userId: number): Promise<number> => {
  return await User.removeById(userId);
};

export default { getUser, updateUser, deleteUser, createUser };
