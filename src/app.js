import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './database/sequelize';
import routes from './routes';

import dotenv from 'dotenv';
dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.initMiddlewares();
    this.initRoutes();
  }

  databaseConnection = () => {
    return this.sequelizeAuthenticate().then(this.sequelizeSync);
  };

  // 연결 확인
  sequelizeAuthenticate = () => {
    return sequelize.authenticate();
  };

  // 동기화
  sequelizeSync = () => {
    return sequelize.sync({ force: false });
  };

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  initRoutes() {
    this.app.use('/api', routes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
