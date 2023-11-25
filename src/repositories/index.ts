import User from './UserRepositories';
import Login from './LoginRepositories';
import knexInstance from 'knex';
import config from '../../knexfile';
const knex = knexInstance(config);

export { User, knex, Login };
