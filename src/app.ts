import { errorHandler, notFoundHanlder } from './middlewares/errorHandler';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(router, errorHandler);

// app.use();
app.all('*', notFoundHanlder);

export { app };
