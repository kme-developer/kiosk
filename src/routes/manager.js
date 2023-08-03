import { Router } from 'express';
import { ManagerController } from '../controller/manager.controller';
import isManager from '../middleware/isManager.middleware';

const router = Router();
const managerController = new ManagerController();

// http://localhost:3000/api/manager/signup
router.post('/signup', managerController.postManager);
// http://localhost:3000/api/manager/login
router.post('/login', managerController.login);
// http://localhost:3000/api/manager
router.delete('/', isManager, managerController.deleteManager);

export default router;
