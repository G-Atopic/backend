import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import log from './middlewares/requestLogger';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
  log.requestLogger({ req });
  res.send('Backend API Version 0.1.2!');
});

app.use(router, errorHandler);

app.all('*', notFoundHandler);

export { app };
