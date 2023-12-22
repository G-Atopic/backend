import { Router } from 'express';
import UserController from '../controller/UserController';
import {
  validateRouteId,
  createUserBody,
  updateUserBody,
} from '../middlewares';

const router = Router();

router.get('/:id', validateRouteId, UserController.findUserById);

router.post('/', createUserBody, UserController.createUser);

router.put('/:id', updateUserBody, validateRouteId, UserController.updateUser);

router.delete('/:id', validateRouteId, UserController.deleteUser);

export default router;
