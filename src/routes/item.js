import { Router } from 'express';
import { ItemController } from '../controller';

const router = Router();
const itemController = new ItemController();

// http://localhost:3000/api/item
router.post('/item', itemController.postItem);

export default router;
