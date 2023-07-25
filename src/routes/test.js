import { Router } from 'express';
import { TestController } from '../controller';

const router = Router();
const testController = new TestController();

// http://localhost:3000/api/hello
router.get('/hello', testController.hello);

export default router;
