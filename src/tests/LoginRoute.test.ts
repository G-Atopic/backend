import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
import { Login } from '../repositories';
describe('Login Route Test', () => {
  const spy = vi.spyOn(Login, 'findUser');
  test('should login successfully', async () => {
    spy.mockImplementationOnce(async () => ({
      id: 2,
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '$2b$10$PfegHbxu.DV8uBuSvVOz4uWDcTu2Bn903Ix1Ht1We0MDJBG.cfqhq',
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
      id: 2,
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      photo: null,
    });
  });

  test('login should fail', async () => {
    spy.mockImplementationOnce(async () => ({
      id: 2,
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '$2b$10$PfegHbxu.DV8uBuSvVOz4uWDcTu2Bn903Ix1Ht1We0MDJBG.cfqhq',
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
