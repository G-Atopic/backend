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
  const newUser = await User.create({ ...userData, password });

  return newUser;
};

const updateUser = async (
  userId: number,
  userData: UserType.UserUpdate,
): Promise<UserType.DatabaseUser> => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  const user = await User.findByIdAndUpdate(userId, userData);

  if (!user) throw errorConstructor({ message: 'User not found', code: 400 });
  return user;
};

const deleteUser = async (userId: number): Promise<number> => {
  return await User.findByIdAndRemove(userId);
};

export default { getUser, updateUser, deleteUser, createUser };
