import express from 'express';

import testRouter from './test';
import itemRouter from './item';
import orderRouter from './order';

const router = express.Router();

// http://localhost:3000/api
router.use('/', testRouter);
// http://localhost:3000/api/manager
router.use('/manager', itemRouter);
// http://localhost:3000/api/
router.use('/', orderRouter);

export default router;
