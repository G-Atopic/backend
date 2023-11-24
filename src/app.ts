import { errorHandler, notFoundHanlder } from './middlewares/errorHandler';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend API Version 0.1.2!');
});
app.use(router, errorHandler);
app.all('*', notFoundHanlder);

export { app };
