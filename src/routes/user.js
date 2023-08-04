import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import isUser from '../middleware/isUser.middleware';

const router = Router();
const userController = new UserController();

// http://localhost:3000/api/user/signup
router.post('/user/signup', userController.postUser);
// http://localhost:3000/api/user/login
router.post('/user/login', userController.login);
// http://localhost:3000/api/user/:userId
router.delete('/user/:userId', isUser, userController.deleteUser);
// http://localhost:3000/api/user/:userId/order
router.get('/user/:userId/order', isUser, userController.getOrdersForUser);
// http://localhost:3000/api/order/:orderId
router.get('/order/:orderId', userController.getOrder);

export default router;
