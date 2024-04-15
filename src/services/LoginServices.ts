import bcrypt from 'bcrypt';
import { Login } from '../repositories';
import { errorConstructor } from '../utils';
import { LoginType } from '../types';
import jwt from 'jsonwebtoken';

const validatePassword = async ({
  databasePassword,
  buttons,
  binaryPassword,
}: LoginType.ValidateLoginParams): Promise<boolean> => {
  const allPossiblePasswords: Promise<boolean>[] = [];

  for (let indexA = 1; indexA <= 2 ** binaryPassword.length; indexA++) {
    const onePossiblePassword = binaryPassword
      .map((_binaryPasswordDigit, indexB) => {
        const singularButton = buttons[binaryPassword[indexB]];
        const currentBinaryDigit = Math.floor(
          (indexA % 2 ** (indexB + 1)) / 2 ** indexB,
        );
        return singularButton[currentBinaryDigit];
      })
      .join('');

    allPossiblePasswords.push(
      bcrypt.compare(onePossiblePassword, databasePassword),
    );
  }

  const allPasswordVerified = await Promise.all(allPossiblePasswords);
  return allPasswordVerified.some((isPasswordValid) => isPasswordValid);
};

const userLogin = async ({
  email,
  buttons,
  binaryPassword,
}: LoginType.UserLoginParams): Promise<{ token: string }> => {
  const user = await Login.findUser(email);
  if (!user) {
    throw errorConstructor({ message: 'User not found', code: 400 });
  }

  const databasePassword = user.password;

  const isPasswordValid = await validatePassword({
    databasePassword,
    buttons,
    binaryPassword,
  });

  if (!isPasswordValid) {
    throw errorConstructor({ message: 'Invalid Credentials', code: 401 });
  }

  const secret: string = process.env.JWT!;
  const token = jwt.sign({ ...user }, secret, { expiresIn: '1d' });
  return { token };
};

export default { userLogin };
