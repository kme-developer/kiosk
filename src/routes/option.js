import { Router } from 'express';
import { OptionController } from '../controller';
import isManager from '../middleware/isManager.middleware';

const router = Router();
const optionController = new OptionController();

// http://localhost:3000/api/manager/option
router.post('/option', isManager, optionController.createOption);
// http://localhost:3000/api/manager/option/:optionId
router.delete('/option/:optionId', isManager, optionController.deleteOption);

export default router;
