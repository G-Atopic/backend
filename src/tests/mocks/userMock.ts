import { logMock } from './requestLogMock';

export const mocks = {
  databaseUserWithPhoto: {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    photo: 'https://via.placeholder.com/150',
  },
  databaseUserPhotoNull: {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    photo: null,
  },
  userToCreate: {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
    photo: 'https://via.placeholder.com/150',
  },
  logger: {
    ...logMock,
    success: true,
  },
};
