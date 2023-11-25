import { knex } from './index';
import { UserType } from '../types';

const findById = async (id: number): Promise<UserType.DatabaseUser> =>
  await knex('users')
    .select('id', 'name', 'email', 'photo')
    .where({ id })
    .first();

const findByEmail = async (email: string) =>
  await knex('users')
    .select('id', 'name', 'email', 'photo')
    .where({ email })
    .first();

const create = async (data: UserType.User): Promise<UserType.DatabaseUser[]> =>
  await knex('users').insert(data).returning(['id', 'name', 'email', 'photo']);

const update = async (
  id: number,
  data: UserType.UserPatch,
): Promise<UserType.DatabaseUser[]> => {
  try {
    console.log('quebra aqui?', data);
    const user = await knex('users')
      .where({ id })
      .update(data)
      .returning(['id', 'name', 'email', 'photo']);
    console.log('quebra aqui?');
    return user;
  } catch (error) {
    return [];
  }
};
// .returning(['id', 'name', 'email', 'photo']);

const removeById = async (id: number) =>
  await knex('users').where({ id }).del();

export default {
  findById,
  create,
  update,
  removeById,
  findByEmail,
};
