import OnlineUsersState from '@/infra/states/user/online-users.state';
import { UserLoginOutputDto } from '@/usecases/user/login/login.usecase.dtos';
import { Socket, Server } from 'socket.io';

class UserHandler {
    public register(io: Server, socket: Socket) { 
        socket.on('user:get-online-users', this.getOnlineUsers(socket));
        socket.on('user:login', this.addOnlineUser(socket));
        socket.on('user:logout', this.removeOnlineUser(socket));
    }

    private getOnlineUsers(socket: Socket) {
        return () => {
            const onlineUsers = OnlineUsersState.get();
            console.log('Online users:', onlineUsers.length);
            socket.emit('user:online-users', onlineUsers);
        }
    }

    private addOnlineUser(socket: Socket) {
        return (rawUser: any) => {
            const user: UserLoginOutputDto = rawUser._doc;
            user.status = rawUser.status;
            OnlineUsersState.add({...user, socketId: socket.id});
            console.log('User added to online users:', user.id);
            socket.broadcast.emit('user:online-users', OnlineUsersState.get());
        }
    }

    public removeOnlineUser(socket: Socket) {
        return (id: string) => {
            OnlineUsersState.remove(id);
            console.log('User removed from online users:', id);
            socket.broadcast.emit('user:online-users', OnlineUsersState.get());
        }
    }
}

export default new UserHandler();