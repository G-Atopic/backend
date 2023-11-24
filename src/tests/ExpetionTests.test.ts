import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
describe('Exeption Routes Test', () => {
  test('test route customError should return error', async () => {
    const response = await request(app).get('/error/customError');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Custom Error',
    });
  });
  test('test route error should return error', async () => {
    const response = await request(app).get('/error/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Something went wrong!',
    });
  });
  test('test route not found should return error', async () => {
    const response = await request(app).get('/notFound');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Route not found!',
    });
  });

  test('test route customError should return error with stack true', async () => {
    const response = await request(app).get('/error/customError?stack=true');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Custom Error',
    });
  });
  test('test route error should return error with stack true', async () => {
    const response = await request(app).get('/error/error?stack=true');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Error',
      stack: expect.any(String),
    });
  });
  test('test route not found should return error with stack true', async () => {
    const response = await request(app).get('/notFound?stack=true');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Route not found!',
    });
  });
});
