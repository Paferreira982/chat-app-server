import LoginController from '@/infra/http/controllers/login.controller';
import { Router } from 'express';

const router = Router();

router.post('/', LoginController.doLogin);

export default router;
