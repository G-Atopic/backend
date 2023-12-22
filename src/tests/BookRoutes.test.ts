import request from 'supertest';
import { app } from '../app';
import { expect, test, describe, vi } from 'vitest';
import { Book } from '../repositories/index';

import bcrypt from 'bcrypt';

const mocks = {};

vi.spyOn(bcrypt, 'hash').mockImplementation(async () => 'FakeHash');

describe('Create Book Route', () => {
  const spy = vi.spyOn(Book, 'findBookById');
  test('should successufully return a newly created book', async () => {
    // spy.mockImplementationOnce(async () => mocks.databaseUserWithPhoto);

    const response = await request(app).post('/book/1');
    expect(response.status).toBe(200);
    // expect(response.body).toEqual(mocks.databaseUserWithPhoto);
  });
});
