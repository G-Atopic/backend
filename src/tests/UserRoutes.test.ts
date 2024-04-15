import request from 'supertest';
import { app } from '../app';
import { expect, it, describe, vi, afterEach } from 'vitest';
import { User } from '../repositories/index';
import log from '../middlewares/requestLogger';
import { errorConstructor } from '../utils';
import bcrypt from 'bcrypt';
import { mocks } from './mocks/userMock';

vi.spyOn(bcrypt, 'hash').mockImplementation(async () => 'FakeHash');

afterEach(() => {
  vi.clearAllMocks();
});

const spyLog = vi
  .spyOn(log, 'requestLogger')
  .mockImplementation(() => mocks.logger);

describe('Find User Route', () => {
  const spy = vi.spyOn(User, 'findById');
  it('should return an user with photo', async () => {
    spy.mockImplementationOnce(async () => mocks.databaseUserWithPhoto);

    const response = await request(app).get('/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mocks.databaseUserWithPhoto);
    expect(spyLog).toBeCalledTimes(1);
  });

  it('should return an user without photo', async () => {
    spy.mockImplementationOnce(async () => mocks.databaseUserPhotoNull);

    const response = await request(app).get('/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mocks.databaseUserPhotoNull);
    expect(spyLog).toBeCalledTimes(1);
  });
  it('should return error Invalid user id', async () => {
    const response = await request(app).get('/user/x');

    expect(response.body).toEqual({
      code: 400,
      message: 'Invalid user id',
    });
    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(400);
  });
  it('should return error not found user', async () => {
    spy.mockImplementationOnce(async () => {
      throw errorConstructor({ message: 'User not found', code: 400 });
    });
    const response = await request(app).get('/user/100');

    expect(response.body).toEqual({
      code: 400,
      message: 'User not found',
    });
    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(400);
  });
});

describe('Create User Route', () => {
  const spyCreate = vi.spyOn(User, 'create');
  const spyFindByEmail = vi.spyOn(User, 'findByEmail');
  it('should create a new user', async () => {
    spyFindByEmail.mockImplementationOnce(async () => undefined);
    spyCreate.mockImplementationOnce(async () => mocks.databaseUserWithPhoto);

    const response = await request(app).post('/user').send(mocks.userToCreate);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      photo: 'https://via.placeholder.com/150',
    });
    expect(spyLog).toBeCalledTimes(1);
  });
  it('should fail on create a new user with same email', async () => {
    spyFindByEmail.mockImplementationOnce(
      async () => mocks.databaseUserPhotoNull,
    );
    // spyCreate.mockImplementationOnce(async () => mocks.databaseUserWithPhoto);

    const response = await request(app).post('/user').send(mocks.userToCreate);

    expect(spyLog).toBeCalledTimes(1);
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
  it('should update an existing user', async () => {
    spyUpdate.mockImplementationOnce(async () => mocks.databaseUserPhotoNull);
    spyFindByEmail.mockImplementationOnce(async () => undefined);

    const response = await request(app).put('/user/2').send(mocks.userToCreate);

    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      photo: null,
    });
  });
  it('should return error User not found', async () => {
    spyUpdate.mockImplementationOnce(async () => undefined);
    const response = await request(app).put('/user/1');

    expect(response.body).toEqual({ message: 'User not found', code: 400 });
    expect(response.status).toBe(400);
  });
  it('should also return error User not found', async () => {
    spyUpdate.mockImplementationOnce(async () => undefined);
    spyFindByEmail.mockImplementationOnce(
      async () => mocks.databaseUserPhotoNull,
    );
    const response = await request(app)
      .put('/user/1')
      .send({ email: 'email@test.com' });

    expect(spyLog).toBeCalledTimes(1);
    expect(response.body).toEqual({
      message: 'Email already exists',
      code: 400,
    });
    expect(response.status).toBe(400);
  });
  it('should return error Invalid user id', async () => {
    const response = await request(app).put('/user/x');

    expect(spyLog).toBeCalledTimes(1);
    expect(response.body).toEqual({
      message: 'Invalid user id',
      code: 400,
    });
    expect(response.status).toBe(400);
  });
});

describe('Delete User Route', () => {
  const spy = vi.spyOn(User, 'removeById');
  it('should delete an existing user', async () => {
    spy.mockImplementationOnce(async () => 1);

    const response = await request(app).delete('/user/1');

    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(200);
  });

  it('should return error user not found', async () => {
    spy.mockImplementationOnce(async () => 0);

    const response = await request(app).delete('/user/1');

    expect(response.status).toBe(404);
  });

  it('should return error Invalid user id', async () => {
    const response = await request(app).delete('/user/x');

    expect(response.body).toEqual({
      code: 400,
      message: 'Invalid user id',
    });

    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(400);
  });
});
