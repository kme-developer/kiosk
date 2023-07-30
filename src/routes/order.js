import { Router } from 'express';
import { OrderController } from '../controller';

const router = Router();
const orderController = new OrderController();

// http://localhost:3000/api/manager/order/:orderId
router.put('/manager/order/:orderId', orderController.updateState);

export default router;
