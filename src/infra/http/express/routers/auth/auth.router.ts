import loginRouter from './login/login.router';
import { Router } from 'express';

const router = Router();

router.use('/login', loginRouter);

export default router;
