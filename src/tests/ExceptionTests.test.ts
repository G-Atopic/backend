import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import log from '../middlewares/requestLogger';
import { logMock } from './mocks/requestLogMock';

beforeEach(() => {
  vi.clearAllMocks();
});

const spyLog = vi.spyOn(log, 'requestLogger').mockImplementation(() => ({
  ...logMock,
  success: true,
}));

describe('Exception Routes Test', () => {
  test('test route customError should return error', async () => {
    const response = await request(app).get('/error/customError');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Custom Error',
    });
    expect(spyLog).toBeCalledTimes(1);
  });
  test('test route error should return error', async () => {
    const response = await request(app).get('/error/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Something went wrong!',
    });
    expect(spyLog).toBeCalledTimes(1);
  });
  test('test route not found should return error', async () => {
    const response = await request(app).get('/notFound');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Route not found!',
    });
    expect(spyLog).toBeCalledTimes(1);
  });

  test('test route customError should return error with stack true', async () => {
    const response = await request(app).get('/error/customError?stack=true');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Custom Error',
    });
    expect(spyLog).toBeCalledTimes(1);
  });
  test('test route error should return error with stack true', async () => {
    const response = await request(app).get('/error/error?stack=true');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Something went wrong!',
      stack: expect.any(String),
    });
    expect(spyLog).toBeCalledTimes(1);
  });
  test('test route not found should return error with stack true', async () => {
    const response = await request(app).get('/notFound?stack=true');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Route not found!',
    });
    expect(spyLog).toBeCalledTimes(1);
  });
});
