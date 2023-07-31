import { Router } from 'express';
import { OptionController } from '../controller';

const router = Router();
const optionController = new OptionController();

// http://localhost:3000/api/manager/option
router.post('/manager/option', optionController.createOption);
// http://localhost:3000/api/manager/option/:optionId
router.delete('/manager/option/:optionId', optionController.deleteOption);

export default router;
