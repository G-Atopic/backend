import bcrypt from 'bcrypt';
import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi, afterEach } from 'vitest';
import { Login } from '../repositories';
import log from '../middlewares/requestLogger';
import { logMock } from './mocks/requestLogMock';
import { loginParamsMock, userMock } from './mocks/logginMock';

afterEach(() => {
  vi.clearAllMocks();
});

describe('Login Route Test', () => {
  const spyLog = vi.spyOn(log, 'requestLogger').mockImplementation(() => ({
    ...logMock,
    success: true,
  }));

  const spy = vi.spyOn(Login, 'findUser');
  test('should login successfully', async () => {
    vi.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    spy.mockImplementationOnce(async () => userMock);
    const response = await request(app)
      .post('/login?stack=true')
      .send(loginParamsMock);

    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  test('login should fail', async () => {
    vi.spyOn(bcrypt, 'compare').mockImplementation(async () => false);
    spy.mockImplementationOnce(async () => userMock);
    const response = await request(app).post('/login').send(loginParamsMock);

    expect(spyLog).toBeCalledTimes(1);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid Credentials',
      code: 401,
    });
  });
});
