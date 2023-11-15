import { Router } from 'express';
import userRoutes from './userRoutes';
import errorRoutes from './errorRoutes';

const router = Router();

router.use('/error', errorRoutes);
router.use('/user', userRoutes);

export default router;
