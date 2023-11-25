import bcrypt from 'bcrypt';
import { Login } from '../repositories';
import { errorConstructor } from '../utils';
import { LoginType, UserType } from '../types';

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
        const currentBinayDigit = Math.floor(
          (indexA % 2 ** (indexB + 1)) / 2 ** indexB,
        );
        return singularButton[currentBinayDigit];
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
}: LoginType.UserLoginParams): Promise<UserType.DatabaseUser> => {
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
  delete user.password;
  return user;
};

export default { userLogin };
