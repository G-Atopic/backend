import { Request } from 'express';
import { Logger } from '../repositories';
import { LogType } from '../types';

type LoggerParams = {
  req: Request;
  success?: boolean;
};

const requestLogger = ({ req, success = true }: LoggerParams) => {
  const logger: LogType.LogData = {
    hasAuth: !!req.headers['authorization'],
    userAgent: req.headers['user-agent'] || 'unknown user-agent',
    contentLength: req.headers['content-length'] || 'no content',
    fullUrl: req.headers.host + req.url,
    path: req.url,
    method: req.method,
    success: success,
  };

  Logger.insertRequestLog(logger);

  return logger;
};

export default { requestLogger };
