import express from 'express';

import testRouter from './test';

const router = express.Router();

// http://localhost:3000/api
router.use('/', testRouter);

export default router;
