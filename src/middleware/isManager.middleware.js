import { verify } from 'jsonwebtoken';
import Managers from '../database/models/manager';

import dotenv from 'dotenv';
dotenv.config();

const isManager = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'authorization error' });
  }

  try {
    const { id } = verify(token, process.env.JWT_KEY);
    const manager = await Managers.findOne({ where: { id: id } });
    if (!manager) {
      return res.status(404).json({ message: 'manager not found' });
    }
    req.manager = manager;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error',
    });
  }
};

export default isManager;
