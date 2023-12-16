import bcrypt from 'bcrypt';
import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
import { Login } from '../repositories';
describe('Login Route Test', () => {
  const spy = vi.spyOn(Login, 'findUser');
  test('should login successfully', async () => {
    vi.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    spy.mockImplementationOnce(async () => ({
      id: 2,
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: 'EncriptedStringPassword',
      photo: null,
    }));
    const response = await request(app)
      .post('/login')
      .send({
        email: 'gabriel@gmail.com',
        buttons: [
          [0, 5],
          [3, 9],
          [1, 2],
          [8, 7],
          [4, 6],
        ],
        binaryPassword: [2, 2, 1, 4],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  test('login should fail', async () => {
    vi.spyOn(bcrypt, 'compare').mockImplementation(async () => false);
    spy.mockImplementationOnce(async () => ({
      id: 2,
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: 'EncriptedStringPassword',
      photo: null,
    }));
    const response = await request(app)
      .post('/login')
      .send({
        email: 'gabriel@gmail.com',
        buttons: [
          [0, 5],
          [3, 9],
          [1, 2],
          [8, 7],
          [4, 6],
        ],
        binaryPassword: [2, 2, 1, 3],
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid Credentials',
      code: 401,
    });
  });
});
