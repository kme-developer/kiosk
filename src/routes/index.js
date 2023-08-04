import express from 'express';

import testRouter from './test';
import itemRouter from './item';
import orderRouter from './order';
import optionRouter from './option';
import userRouter from './user';
import managerRouter from './manager';

const router = express.Router();

// http://localhost:3000/api
router.use('/', testRouter);
// http://localhost:3000/api
router.use('/', itemRouter);
// http://localhost:3000/api
router.use('/', orderRouter);
// http://localhost:3000/api/manager
router.use('/manager', optionRouter);

// http://localhost:3000/api
router.use('/', userRouter);
// http://localhost:3000/api/manager
router.use('/manager', managerRouter);

export default router;
