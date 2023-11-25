import { Router } from 'express';
import UserController from '../controller/UserController';
import {
  validateRouteId,
  validateCreateBody,
  validateUpdateBody,
} from '../middlewares/validateRequest';

const router = Router();

router.get('/:id', validateRouteId, UserController.findUserById);

router.post('/', validateCreateBody, UserController.createUser);

router.put(
  '/:id',
  validateUpdateBody,
  validateRouteId,
  UserController.updateUser,
);

router.delete('/:id', validateRouteId, UserController.deleteUser);

export default router;
