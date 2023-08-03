import { Router } from 'express';
import { ItemController } from '../controller';
import isManager from '../middleware/isManager.middleware';

const router = Router();
const itemController = new ItemController();

// http://localhost:3000/api/manager/item
router.post('/item', isManager, itemController.postItem);
// http://localhost:3000/api/manager/item
router.get('/item', isManager, itemController.getItem);
// http://localhost:3000/api/manager/item/:itemId
router.put('/item/:itemId', isManager, itemController.updateItem);
// http://localhost:3000/api/manager/item/:itemId
router.delete('/item/:itemId', isManager, itemController.deleteItem);
// http://localhost:3000/api/manager/response/item/:itemId
router.delete('/response/item/:itemId', isManager, itemController.deleteItemWithResponse);

export default router;
