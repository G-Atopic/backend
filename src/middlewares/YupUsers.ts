import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const createUserBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      photo: yup.string(),
    });

    await schema.validate(req.body);

    next();
  } catch (error) {
    next(error);
  }
};

const updateUserBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string(),
      photo: yup.string(),
    });

    await schema.validate(req.body);

    next();
  } catch (error) {
    next(error);
  }
};

const validateRouteId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = yup.object().shape({
      id: yup.number().typeError('Invalid user id'),
    });

    await schema.validate(req.params);

    next();
  } catch (error) {
    next(error);
  }
};

export { validateRouteId, createUserBody, updateUserBody };
