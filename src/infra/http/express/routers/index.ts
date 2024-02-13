import authRouter from './auth/auth.router';
import usersRouter from './users/users.router';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
