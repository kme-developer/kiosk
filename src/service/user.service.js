import jwt from 'jsonwebtoken';
import Users from '../database/models/user';
import Orders from '../database/models/order';

import dotenv from 'dotenv';
dotenv.config();

export class UserService {
  postUser = async (email, password) => {
    if (!email || !password) {
      return {
        message: '입력되지 않은 값이 존재합니다.',
      };
    }

    try {
      await Users.create({ email, password });
      return {
        message: 'user, method: post => success',
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
      const user = await Users.findOne({ where: { email } });
      if (!user || password !== user.password) {
        return res.status(412).json({ message: '일치하지 않는 값이 존재합니다.' });
      }

      // JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
      return { token };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  deleteUser = async (id) => {
    if (!id) {
      return {
        message: '비회원은 사용할 수 없는 기능입니다.',
      };
    }

    try {
      await Users.destroy({ where: { id } });
      return {
        message: 'user, method: delete => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  getOrdersForUser = async (id) => {
    try {
      const orders = await Orders.findAll({ where: { user_id: id } });
      return {
        result: orders,
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  getOrder = async (orderId) => {
    try {
      const order = await Orders.findOne({ where: { order_id: orderId } });
      return {
        result: order,
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };
}
