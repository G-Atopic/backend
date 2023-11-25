import bcrypt from 'bcrypt';
import { LoginType } from './types';

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

    console.log(onePossiblePassword);

    allPossiblePasswords.push(
      bcrypt.compare(onePossiblePassword, databasePassword),
    );
  }

  const allPasswordVerified = await Promise.all(allPossiblePasswords);
  return allPasswordVerified.some((isPasswordValid) => isPasswordValid);
};

const loginParams: LoginType.ValidateLoginParams = {
  databasePassword: 'hashedPassword',
  buttons: [
    [0, 5],
    [3, 9],
    [1, 2],
    [8, 7],
    [4, 6],
  ],
  binaryPassword: [2, 2, 1, 4],
};

validatePassword(loginParams);
