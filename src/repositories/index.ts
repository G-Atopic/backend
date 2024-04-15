import User from './UserRepositories';
import Login from './LoginRepositories';
import Logger from './LoggerRepositories';
import knexInstance from 'knex';
import config from '../../knexfile';
const knex = knexInstance(config);

export { User, knex, Login, Logger };
