import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import isUser from '../middleware/isUser.middleware';

const router = Router();
const userController = new UserController();

// http://localhost:3000/api/user/signup
router.post('/signup', userController.postUser);
// http://localhost:3000/api/user/login
router.post('/login', userController.login);
// http://localhost:3000/api/user/:userId
router.delete('/:userId', isUser, userController.deleteUser);

export default router;
