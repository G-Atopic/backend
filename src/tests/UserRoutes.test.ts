import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
import { User } from '../repositories/index';
import { errorConstructor } from '../utils';
const mocks = {
  findById: {
    id: 1,
    name: 'Gabriel',
    email: 'gabriel.gmail.com',
    photo: null,
  },
};
describe('UserRoutes', () => {
  const spy = vi.spyOn(User, 'findById');
  test('should return an user', async () => {
    spy.mockImplementationOnce(async () => mocks.findById);

    const response = await request(app).get('/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Gabriel',
      email: 'gabriel.gmail.com',
      photo: null,
    });
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
      message: 'User not foun',
    });
    expect(response.status).toBe(400);
  });
});
