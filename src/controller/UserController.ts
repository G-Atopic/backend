import { Request, Response, NextFunction } from 'express';
import { User } from '../services';
import log from '../middlewares/requestLogger';

const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const user = await User.getUser(id);

    log.requestLogger({ req, success: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.createUser(req.body);

    log.requestLogger({ req, success: true });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await User.updateUser(id, req.body);

    log.requestLogger({ req, success: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const deleted = await User.deleteUser(id);

    log.requestLogger({ req, success: !!deleted });
    res.status(200).json({ msg: `Removed user with id: ${deleted}` });
  } catch (error) {
    next(error);
  }
};

export default {
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
