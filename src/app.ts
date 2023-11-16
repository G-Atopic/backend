import { errorHandler, notFoundHanlder } from './middlewares/errorHandler';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();
app.use(cors());

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(router, errorHandler);

app.all('*', notFoundHanlder);

export { app };
