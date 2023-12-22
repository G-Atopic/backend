import { Router } from 'express';
import LoginController from '../controller/LoginController';
import { loginValidatorMiddleware } from '../middlewares';

const router = Router();

router.post('/', loginValidatorMiddleware, LoginController.login);

export default router;
