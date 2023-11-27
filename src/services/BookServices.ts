import { Book } from '../repositories';
import { BookType } from '../types';
import { errorConstructor } from '../utils';

const getBookById = async (bookId: string): Promise<BookType.DatabaseBook> => {
  const book = await Book.fingBookById(bookId);
  if (!book) throw errorConstructor({ message: 'Book not found', code: 400 });

  return book;
};
const getBookByName = async (
  bookId: string,
): Promise<BookType.DatabaseBook[]> => {
  const booksFound = await Book.fingBookByName(bookId);
  if (!booksFound[0]) {
    throw errorConstructor({ message: 'Book not found', code: 400 });
  }

  return booksFound;
};

const createBook = async (
  bookData: BookType.Book,
): Promise<BookType.DatabaseBook> => {
  const book = await Book.createBook(bookData);
  return book;
};

const updateBook = async (
  bookId: string,
  bookData: BookType.BookPatch,
): Promise<BookType.DatabaseBook> => {
  const book = await Book.updateBook(bookId, bookData);
  if (!book) throw errorConstructor({ message: 'Book not found', code: 400 });

  return book;
};

const deleteBook = async (bookId: string): Promise<void> => {
  const deletedBook = await Book.deleteBook(bookId);
  if (!deletedBook)
    throw errorConstructor({ message: 'Book not found', code: 400 });
};

export default {
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookByName,
};
