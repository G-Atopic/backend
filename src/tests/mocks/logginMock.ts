const loginParamsMock = {
  buttons: [
    [0, 5],
    [3, 9],
    [1, 2],
    [8, 7],
    [4, 6],
  ],
  binaryPassword: [2, 2, 1, 4],
  email: 'gabriel@gmail.com',
};
const userMock = {
  id: 2,
  name: 'Gabriel',
  email: 'gabriel@gmail.com',
  password: 'MockEncryptedStringPassword',
  photo: null,
};
export { loginParamsMock, userMock };
