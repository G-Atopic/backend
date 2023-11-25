import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

// GET user by ID
router.get('/:id', UserController.findUserById);

// CREATE a user
router.post('/', UserController.createUser);

// UPDATE a user
router.put('/:id', UserController.updateUser);

// DELETE a user
router.delete('/:id', UserController.deleteUser);

export default router;
