import { Request, Response, NextFunction } from 'express';
import { Login } from '../services';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Login.userLogin(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default { login };
