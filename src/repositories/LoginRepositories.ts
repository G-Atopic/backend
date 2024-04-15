import { UserType } from '../types';
import { knex } from './index';
const findUser = async (email: string): Promise<UserType.User> =>
  await knex('users').select('*').where({ email }).first();

export default { findUser };
