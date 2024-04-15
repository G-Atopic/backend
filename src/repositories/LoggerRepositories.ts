import { LogType } from '../types';
import { knex } from './index';

const insertRequestLog = (logData: LogType.LogData) =>
  knex('log').insert(logData);

export default { insertRequestLog };
