import UserRepository from "@/infra/repository/user/mongodb/user.repository";
import { RegisterUserUsecase } from "@/usecases/user/register/register.usecase";
import Authenticator from "@/infra/auth/jsonwebtoken";
import { Request, Response } from "express";
import onlineUsersState from "@/infra/states/user/online-users.state";

class UserController {
    public async findAll(req: Request, res: Response) {
        try {
            const users = await UserRepository.findAll();

            return res.json(users).status(200);
        } catch (error: any) {
            return res.json({ error: 'INTERNAL_SERVER_ERROR' }).status(500);
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const userId = req.params.id as string;
            const user = await UserRepository.findById(userId);
            user.status = onlineUsersState.isOnline(user.id) ? 'online' : 'offline';

            if (!user) {
                return res.json({ error: 'NOT_FOUND' }).status(404);
            }
            
            return res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                status: user.status
            }).status(200);
        } catch (error: any) {
            console.log(error);
            return res.json({ error: 'INTERNAL_SERVER_ERROR' }).status(500);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { email, name, password, profileImage } = req.body;
            const registerUseCase = new RegisterUserUsecase(UserRepository, Authenticator);
            const response = await registerUseCase.execute({ email, name, password, profileImage });
    
            return res.json(response).status(201);
        } catch (error: any) {
            if (error.name == 'DomainException') {
                return res.json({ error: 'BAD_REQUEST', message: error.message }).status(400);
            }
    
            if (error.name == 'MongoServerError' && error.code === 11000) {
                return res.json({ error: 'BAD_REQUEST', message: 'E-mail já cadastrado.' }).status(400);
            }
    
            console.log(error);
            return res.json({ error: 'INTERNAL_SERVER_ERROR' }).status(500);
        }
    }
}

export default new UserController();