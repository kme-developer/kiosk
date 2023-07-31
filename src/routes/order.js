import { Router } from 'express';
import { OrderController } from '../controller';

const router = Router();
const orderController = new OrderController();

// http://localhost:3000/api/order/:orderId
router.post('/order/:orderId', orderController.postOrder);
// http://localhost:3000/api/order/:orderId/item/:itemId
router.post('/order/:orderId/item/:itemId', orderController.postOrderItem);
// http://localhost:3000/api/manager/order/:orderId/state
router.put('/manager/order/:orderId/state', orderController.updateState);

export default router;
