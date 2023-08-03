import { Router } from 'express';
import { OrderController } from '../controller';
import isUser from '../middleware/isUser.middleware';
import isManager from '../middleware/isManager.middleware';

const router = Router();
const orderController = new OrderController();

// http://localhost:3000/api/order/:orderId
router.post('/order/:orderId', isUser, orderController.postOrder);
// http://localhost:3000/api/order/:orderId/item/:itemId
router.post('/order/:orderId/item/:itemId', isUser, orderController.postOrderItem);
// http://localhost:3000/api/manager/order/:orderId/state
router.put('/manager/order/:orderId/state', isManager, orderController.updateState);

export default router;
