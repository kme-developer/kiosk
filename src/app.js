// src/app.js

import express from 'express';
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
  }

  initRoutes() {
    this.app.use('/api', routes);
  }

  serverListen = () => {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  };

  serverErrorHandler = (error) => {
    console.log('Server Run Error: ', error.message);
  };

  start = async () => {
    try {
      await this.databaseConnection();
      return this.serverListen();
    } catch (error) {
      console.error(error);
      return this.serverErrorHandler(error);
    }
  };
}

const server = new Server();
server.start();
