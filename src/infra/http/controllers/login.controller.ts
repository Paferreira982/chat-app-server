import UserRepository from "@/infra/repository/user/mongodb/user.repository";
import { LoginUsecase } from "@/usecases/user/login/login.usecase";
import Authenticator from "@/infra/auth/jsonwebtoken";
import { Request, Response } from "express";

class LoginController {
    public async doLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
        
            const loginUsecase = new LoginUsecase(UserRepository, Authenticator);
            const response = await loginUsecase.execute({ email, password });
    
            return res.json(response).status(200);
        } catch (error: any) {
            console.log("error", error)
            if (error.message === 'Invalid Credentials') {
                return res.json({ error: 'UNAUTHORIZED' }).status(401);
            }
            
            return res.json({ error: 'INTERNAL_SERVER_ERROR' }).status(500);
        }
    }
}

export default new LoginController();