import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const loginValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      binaryPassword: yup
        .array()
        .of(
          yup
            .number()
            .min(0)
            .max(4)
            .typeError('Binary Password must be a number'),
        )
        .required(),
      buttons: yup
        .array()
        .of(yup.array().of(yup.number().min(0).max(9)))
        .required(),
    });

    await schema.validate(req.body);

    next();
  } catch (error) {
    next(error);
  }
};
const validateCreateBody = async (
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

const validateUpdateBody = async (
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

export {
  validateRouteId,
  loginValidatorMiddleware,
  validateCreateBody,
  validateUpdateBody,
};
