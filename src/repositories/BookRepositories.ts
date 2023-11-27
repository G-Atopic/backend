import { BookType } from '../types';
import { knex } from './index';
const bookMock = {
  id: '12345678-1234-1234-1234-123456789abc',
  name: 'Sample Book',
  authorId: '87654321-4321-4321-4321-210987654321',
  description: 'This is a sample book description',
  photo: 'https://www.example.com/sample-book.jpg',
  totalViews: 100,
  favorites: 50,
  rating: 4.5,
  ratingTotal: 1000,
  pages: 200,
};

const fingBookById = async (id: string): Promise<BookType.DatabaseBook> =>
  await knex('books').select('*').where({ id }).first();

const fingBookByName = async (name: string): Promise<BookType.DatabaseBook[]> =>
  await knex('books').select('*').where({ name });

const createBook = async (
  book: BookType.Book,
): Promise<BookType.DatabaseBook> => {
  const photo = book.photo || 'https://www.example.com/sample-book.jpg';
  const newBook: BookType.InsertBook = {
    ...book,
    photo,
    totalViews: 0,
    favorites: 0,
    rating: 5,
    ratingTotal: 1,
    pages: 0,
  };
  return (await knex('books').insert(newBook).returning('*'))[0];
};

const updateBook = async (
  id: string,
  book: BookType.BookPatch,
): Promise<BookType.DatabaseBook> =>
  (await knex('books').update(book).where({ id }).returning('*'))[0];

const deleteBook = async (id: string): Promise<number> =>
  await knex('books').delete().where({ id });

export default {
  fingBookByName,
  fingBookById,
  createBook,
  updateBook,
  deleteBook,
  bookMock,
};
