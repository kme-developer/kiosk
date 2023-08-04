import { Router } from 'express';
import { OrderController } from '../controller';
import isUser from '../middleware/isUser.middleware';
import isManager from '../middleware/isManager.middleware';

const router = Router();
const orderController = new OrderController();

// http://localhost:3000/api/order/:orderId
router.post('/order/:orderId', isUser, orderController.postOrder);
// http://localhost:3000/api/manager/order
router.get('/manager/order', isManager, orderController.getOrderForManager);
// http://localhost:3000/api/user/:userId/order
router.get('/user/:userId/order', isUser, orderController.getOrderForUser);
// http://localhost:3000/api/order/:orderId
router.get('/order/:orderId', orderController.getOrderForNotUser);
// http://localhost:3000/api/manager/order/:orderId/state
router.put('/manager/order/:orderId/state', isManager, orderController.updateState);

export default router;
