// src/app.js

import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './database/sequelize';
import initCacheOption from './cache/init.option';
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

  // connection
  sequelizeAuthenticate = () => {
    return sequelize.authenticate();
  };

  // sync
  sequelizeSync = () => {
    return sequelize.sync({ force: false });
  };

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
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
      await initCacheOption();
      return this.serverListen();
    } catch (error) {
      console.error(error);
      return this.serverErrorHandler(error);
    }
  };
}

const server = new Server();
server.start();
