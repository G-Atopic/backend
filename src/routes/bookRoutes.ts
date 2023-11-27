import { Router } from 'express';
import BooksController from '../controller/BooksControler';

const router = Router();

router.get('/:name', BooksController.searchBookByName);
router.get('/id/:id', BooksController.findBookById);

router.post('/', BooksController.createBook);

router.put('/:id', BooksController.updateBook);

router.delete('/:id', BooksController.deleteBook);

export default router;
