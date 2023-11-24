import { errorHandler, notFoundHanlder } from './middlewares/errorHandler';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import statusMonitor from 'express-status-monitor';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(statusMonitor);

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend API Version 0.1.2!');
});
app.use(router, errorHandler);

app.all('*', notFoundHanlder);

export { app };
