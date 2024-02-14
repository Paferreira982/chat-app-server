import { MessagePropsType } from '@/domain/message/entities/types';
import messageRepository from '@/infra/repository/message/mongodb/message.repository';
import { SendMessageUsecase } from '@/usecases/message/send/send-message.usecase';
import { UpdateMessageUsecase } from '@/usecases/message/update-status/update-status.usecase';
import { UpdateMessageInputDto } from '@/usecases/message/update-status/update-status.usecase.dtos';
import { Socket, Server } from 'socket.io';

class MessageHandler {
    private sendMessageUsecase: SendMessageUsecase;
    private updateMessageUsecase: UpdateMessageUsecase;

    public constructor() {
        this.sendMessageUsecase = new SendMessageUsecase(messageRepository);
        this.updateMessageUsecase = new UpdateMessageUsecase(messageRepository);
    }

    public register(io: Server, socket: Socket) { 
        socket.on('message:send', this.sendMessage(socket));
        socket.on('message:status:update', this.updateMessageStatus(socket));
        socket.on('message:chat:history', this.getChatHistory(socket));
    }

    private getChatHistory(socket: Socket) {
        return async (data: any) => {
            const { origin, destination } = data;
            const messages = await messageRepository.getChatHistory(origin, destination);
            socket.emit('message:server:chat:history', {chat: destination, messageHistory:messages});
        }
    }

    private updateMessageStatus(socket: Socket) {
        return async (data: UpdateMessageInputDto) => {
            const status = data.status;
            const message = await this.updateMessageUsecase.execute(data);

            socket.broadcast.emit(`message:status-changed`, message);
        }
    }

    private sendMessage(socket: Socket) {
        return async (rawMessage: MessagePropsType) => {
            const message = await this.sendMessageUsecase.execute(rawMessage);
            socket.emit('message:server:recieved', message);
            socket.broadcast.emit('message:new', message);
        }
    }
}

export default new MessageHandler();