import { Request, Response, NextFunction } from 'express';
import { Book } from '../services';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const searchBookByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookName = req.params.name;
    const booksFound = await Book.getBookByName(bookName);

    res.status(200).json(booksFound);
  } catch (error) {
    next(error);
  }
};

const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = req.params.id;
    const book = await Book.getBookById(bookId);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;

    const book = await Book.updateBook(bookId, req.body);

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await Book.deleteBook(id);

    res.status(200).json({ msg: `Removed book with id: ${id}` });
  } catch (error) {
    next(error);
  }
};

export default {
  findBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBookByName,
};
