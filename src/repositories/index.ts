import User from './UserRepositories';
import Login from './LoginRepositories';
import Book from './BookRepositories';
import knexInstance from 'knex';
import config from '../../knexfile';
const knex = knexInstance(config);

export { knex, User, Book, Login };
