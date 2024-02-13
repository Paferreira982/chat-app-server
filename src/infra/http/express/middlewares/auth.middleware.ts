import Authenticator from "@/infra/auth/authenticator.interface";
import { Request, Response } from "express";

export default class AuthMiddleware {
    public constructor(private readonly authenticator: Authenticator) {}

    public guard(): (req: Request, res: Response, next: Function) => void {
        const authenticator = this.authenticator;

        return (req: Request, res: Response, next: Function) => {
            try {
                const token = req.headers.authorization.replace("Bearer ", "");

                if (!token) {
                    return res.status(401).json({ message: "UNAUTHORIZED" });
                }
        
                const isValid = authenticator.validate(token);
                if (!isValid) {
                    return res.status(401).json({ message: "UNAUTHORIZED" });
                }
                
            } catch (error) {
                return res.status(401).json({ message: "UNAUTHORIZED" });
            }
           
    
            next();
        }
        
    }
}