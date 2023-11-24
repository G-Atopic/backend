import { knex } from './index';
const findUser = async (email: string) =>
  await knex('users').select('*').where({ email }).first();

export default { findUser };
