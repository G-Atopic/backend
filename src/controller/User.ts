import { Request, Response, NextFunction } from 'express';
import { User } from '../services';
import { errorConstructor } from '../utils';

const validateId = (paramsId: string): number => {
  const id = Number(paramsId);
  if (!id) throw errorConstructor({ message: 'Invalid user id', code: 400 });
  return id;
};

const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = validateId(req.params.id);
    const user = await User.getUser(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateId(req.params.id);

    const user = await User.updateUser(id, req.body);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateId(req.params.id);
    const deleted = await User.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: `Removed user with id: ${id}` });
  } catch (error) {
    next(error);
  }
};

export default { findUserById, createUser, updateUser, deleteUser };
