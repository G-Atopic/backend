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

export default {};
