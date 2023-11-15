import { Router } from 'express';
import { errorConstructor } from '../utils';

const router = Router();

router.get('/customError', () => {
  throw errorConstructor({ message: 'Custom Error', code: 500 });
});
router.get('/error', () => {
  throw new Error('Error');
});

export default router;
