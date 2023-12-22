import { Router } from 'express';
import userRoutes from './userRoutes';
import errorRoutes from './errorRoutes';
import loginRoutes from './loginRoutes';
import bookRoutes from './bookRoutes';

const router = Router();

router.use('/error', errorRoutes);
router.use('/user', userRoutes);
router.use('/login', loginRoutes);
router.use('/book', bookRoutes);

export default router;
