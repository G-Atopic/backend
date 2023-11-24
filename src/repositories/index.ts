import User from './User';
import Login from './Login';
import knexInstance from 'knex';
import config from '../../knexfile';
const knex = knexInstance(config);

export { User, knex, Login };
