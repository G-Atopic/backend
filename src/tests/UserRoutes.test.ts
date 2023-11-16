import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
import { User } from '../repositories/index';
import { errorConstructor } from '../utils';
import bcrypt from 'bcrypt';

const mocks = {
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
};

vi.spyOn(bcrypt, 'hash').mockImplementation(async () => 'FakeHash');

describe('Find User Route', () => {
  const spy = vi.spyOn(User, 'findById');
  test('should return an user with photo', async () => {
    spy.mockImplementationOnce(async () => mocks.databaseUserWithPhoto);

    const response = await request(app).get('/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mocks.databaseUserWithPhoto);
  });

  test('should return an user without photo', async () => {
    spy.mockImplementationOnce(async () => mocks.databaseUserPhotoNull);

    const response = await request(app).get('/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mocks.databaseUserPhotoNull);
  });
  test('should return error Invalid user id', async () => {
    const response = await request(app).get('/user/x');

    expect(response.body).toEqual({
      code: 400,
      message: 'Invalid user id',
    });
    expect(response.status).toBe(400);
  });
  test('should return error not found user', async () => {
    spy.mockImplementationOnce(async () => {
      throw errorConstructor({ message: 'User not found', code: 400 });
    });
    const response = await request(app).get('/user/100');

    expect(response.body).toEqual({
      code: 400,
      message: 'User not found',
    });
    expect(response.status).toBe(400);
  });
});

describe('Create User Route', () => {
  const spyCreate = vi.spyOn(User, 'create');
  const spyFindByEmail = vi.spyOn(User, 'findByEmail');
  test('should create a new user', async () => {
    spyFindByEmail.mockImplementationOnce(async () => null);
    spyCreate.mockImplementationOnce(async () => [mocks.databaseUserWithPhoto]);

    const response = await request(app).post('/user').send(mocks.userToCreate);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      photo: null,
    });
  });
  test('should fail on create a new user with same email', async () => {
    spyFindByEmail.mockImplementationOnce(async () => true);
    spyCreate.mockImplementationOnce(async () => [mocks.databaseUserWithPhoto]);

    const response = await request(app).post('/user').send(mocks.userToCreate);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: 400,
      message: 'Email already exists',
    });
  });
});

describe('Update User Route', () => {
  const spyUpdate = vi.spyOn(User, 'update');
  const spyFindByEmail = vi.spyOn(User, 'findByEmail');
  test('should update an existing user', async () => {
    spyUpdate.mockImplementationOnce(async () => [mocks.databaseUserPhotoNull]);
    spyFindByEmail.mockImplementationOnce(async () => undefined);

    const response = await request(app).put('/user/2').send(mocks.userToCreate);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      photo: null,
    });
  });
  test('should return error User not found', async () => {
    spyUpdate.mockImplementationOnce(async () => []);
    const response = await request(app).put('/user/1');

    expect(response.body).toEqual({ message: 'User not found', code: 400 });
    expect(response.status).toBe(400);
  });
  test('should return error User not found', async () => {
    spyUpdate.mockImplementationOnce(async () => []);
    spyFindByEmail.mockImplementationOnce(
      async () => mocks.databaseUserPhotoNull,
    );
    const response = await request(app)
      .put('/user/1')
      .send({ email: 'email@test.com' });

    expect(response.body).toEqual({
      message: 'Email already exists',
      code: 400,
    });
    expect(response.status).toBe(400);
  });
  test('should return error Invalid user id', async () => {
    const response = await request(app).put('/user/x');

    expect(response.body).toEqual({
      message: 'Invalid user id',
      code: 400,
    });
    expect(response.status).toBe(400);
  });
});

describe('Delete User Route', () => {
  const spy = vi.spyOn(User, 'removeById');
  test('should delete an existing user', async () => {
    spy.mockImplementationOnce(async () => 1);

    const response = await request(app).delete('/user/1');

    expect(response.status).toBe(200);
  });

  test('should return error user not found', async () => {
    spy.mockImplementationOnce(async () => 0);

    const response = await request(app).delete('/user/1');

    expect(response.status).toBe(404);
  });

  test('should return error Invalid user id', async () => {
    const response = await request(app).delete('/user/x');

    expect(response.body).toEqual({
      code: 400,
      message: 'Invalid user id',
    });
    expect(response.status).toBe(400);
  });
});
