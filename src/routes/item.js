import { Router } from 'express';
import { ItemController } from '../controller';

const router = Router();
const itemController = new ItemController();

// http://localhost:3000/api/manager/item
router.post('/item', itemController.postItem);
// http://localhost:3000/api/manager/item
router.get('/item', itemController.getItem);
// http://localhost:3000/api/manager/item/:itemId
router.put('/item/:itemId', itemController.updateItem);
// http://localhost:3000/api/manager/item/:itemId
router.delete('/item/:itemId', itemController.deleteItem);
// http://localhost:3000/api/manager/response/item/:itemId
router.delete('/response/item/:itemId', itemController.deleteItemWithResponse);

export default router;
