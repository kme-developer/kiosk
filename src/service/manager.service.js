import jwt from 'jsonwebtoken';
import Managers from '../database/models/manager';

import dotenv from 'dotenv';
dotenv.config();

export class ManagerService {
  postManager = async (email, password, name) => {
    if (!email || !password || !name) {
      return {
        message: '입력되지 않은 값이 존재합니다.',
      };
    }

    try {
      await Managers.create({ email, password, name });
      return {
        message: 'manager, method: post => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  login = async (email, password) => {
    if (!email || !password) {
      return {
        message: '입력되지 않은 값이 존재합니다.',
      };
    }

    try {
      const manager = await Managers.findOne({ where: { email } });
      if (!manager || password !== manager.password) {
        return {
          message: '일치하지 않는 값이 존재합니다.',
        };
      }

      // JWT
      const token = jwt.sign({ id: manager.id }, process.env.JWT_KEY);
      return { token };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  deleteManager = async (id) => {
    if (!id) {
      return {
        message: '권한이 존재하지 않습니다.',
      };
    }

    try {
      await Managers.destroy({ where: { id } });
      return {
        message: 'manager, method: delete => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };
}
