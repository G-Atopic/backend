import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
describe('Exeption Routes Test', () => {
  test('should return error Invalid user id', async () => {
    const response = await request(app).get('/error/customError');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Custom Error',
    });
  });
  test('should return error Invalid user id', async () => {
    const response = await request(app).get('/error/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      message: 'Something went wrong!',
    });
  });
  test('should return error Invalid user id', async () => {
    const response = await request(app).get('/notFound');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Route not found!',
    });
  });
});
