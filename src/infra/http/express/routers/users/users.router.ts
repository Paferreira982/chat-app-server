import UserController from '@/infra/http/controllers/user.controller';
import AuthMiddleware from '../../middlewares/auth.middleware';
import JsonWebToken from '@/infra/auth/jsonwebtoken';
import { Router } from 'express';

const authMiddleware = new AuthMiddleware(JsonWebToken);

const router = Router();

router.post('/', UserController.create);
router.get('/', authMiddleware.guard(), UserController.findAll);
router.get('/:id', authMiddleware.guard(), UserController.findById);

export default router;
