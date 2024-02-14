import { User } from "@/domain/user/entities/user.entity";
import { StateInterface } from "../state.interface";
import { SocketServer } from "@/index";
import { UserEntityPropsType } from "@/domain/user/entities/types";

type SocketUserPropsType = {
    socketId: string;
} & UserEntityPropsType;

class OnlineUsers implements StateInterface<SocketUserPropsType> {
    private users: SocketUserPropsType[] = [];
    
    public get(): SocketUserPropsType[] {
        return this.users;
    }
    
    public set(value: SocketUserPropsType[]): void {
        this.users = value;
    }
    
    public add(value: SocketUserPropsType): void {
        if (this.users.some((user) => user.id === value.id)) {

            this.users = this.users.map((user) => {
                if (user.id === value.id) {
                    return value;
                }

                return user;
            });

            return;
        }

        this.users.push(value);
    }
    
    public remove(id: string): void {
        this.users = this.users.filter((user) => user.id !== id);
    }

    public removeBySocketId(socketId: string): void {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }

    public isOnline(id: string): boolean {
        return this.users.some((user) => user.id === id);
    }
}

export default new OnlineUsers();
