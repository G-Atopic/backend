import { LogType } from '../../types';

const logMock: Omit<LogType.LogData, 'success'> = {
  hasAuth: true,
  contentLength: '197',
  fullUrl: 'localhost:3000/?stack=true',
  method: 'GET',
  path: '/?stack=true',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
};

const reqMock = {
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR',
    host: 'localhost:3000',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    'content-length': '197',
  },
  url: '/?stack=true',
  method: 'GET',
};
export { logMock, reqMock };
