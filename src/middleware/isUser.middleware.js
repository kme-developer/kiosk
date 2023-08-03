import { verify } from 'jsonwebtoken';
import { Users } from '../database/models/user';

import dotenv from 'dotenv';
dotenv.config();

const isUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    next();
  } else {
    try {
      const { id } = verify(token, process.env.JWT_KEY);
      const user = await Users.findOne({ where: { id: id } });
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server error',
      });
    }
  }
};

export default isUser;
