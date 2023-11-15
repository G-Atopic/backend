import knexInstance from 'knex';
import config from '../../knexfile';
import { UserType } from '../types';
import { errorConstructor } from '../utils';
const knex = knexInstance(config);

const findById = async (id: number) =>
  await knex('users')
    .select('id', 'name', 'email', 'photo')
    .where({ id })
    .first();

const create = async (data: UserType.User) => {
  const emailAlreadyExists = await knex('users')
    .where({ email: data.email })
    .first();
  if (emailAlreadyExists) {
    throw errorConstructor({ message: 'Email already exists', code: 400 });
  }
  const created = await knex('users').insert(data);

  return findById(created[0]);
};

const findByIdAndUpdate = async (id: number, data: UserType.UserUpdate) => {
  await knex('users').where({ id }).update(data);
  return await findById(id);
};

const findByIdAndRemove = (id: number) => knex('users').where({ id }).del();

export default { findById, create, findByIdAndUpdate, findByIdAndRemove };
