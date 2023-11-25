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
    let onePossiblePassword = '';
    let oneBinaryPassword = '';
    for (let indexB = 0; indexB < binaryPassword.length; indexB++) {
      const key = 2 ** indexB;
      oneBinaryPassword += Math.floor((indexA % (key * 2)) / key);
      onePossiblePassword +=
        buttons[binaryPassword[indexB]][Math.floor((indexA % (key * 2)) / key)];
    }
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
