import { expect, test, describe } from 'vitest';
import { Request } from 'express';
import log from '../middlewares/requestLogger';
import { logMock, reqMock } from './mocks/requestLogMock';

describe('Find User Route', () => {
  const req = reqMock as Request;

  test('success default', () => {
    const logData = log.requestLogger({ req: req });
    expect(logData).toEqual({ success: true, ...logMock });
  });
  test('success false', () => {
    const logData = log.requestLogger({ req: req, success: false });
    expect(logData).toEqual({ success: false, ...logMock });
  });
});
