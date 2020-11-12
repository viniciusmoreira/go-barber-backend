import { errors } from 'celebrate';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import my_errors from './middlewares/errors';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/files', express.static(uploadConfig.uploadsFolder));
    this.app.use(rateLimiter);
  }

  routes() {
    this.app.use(routes);
    this.app.use(errors());
    this.app.use(my_errors);
  }
}

export default new App().app;
