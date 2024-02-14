import { Usecase } from "@/usecases/usecase.interface";
import { SendMessageInputDto, SendMessageOutputDto } from "./send-message.usecase.dtos";
import { MessageEntityPropsType, MessagePropsType, MessageStatus } from "@/domain/message/entities/types";
import { Message } from "@/domain/message/entities/message.entity";
import RepositoryInterface from "@/infra/repository/repository.interface";

export class SendMessageUsecase implements Usecase<SendMessageInputDto, SendMessageOutputDto> {

    public constructor(
        private readonly messageRepository: RepositoryInterface<MessageEntityPropsType>,
    ) {}

    public async execute(input: Omit<MessagePropsType, "status">): Promise<MessagePropsType> {
        const { content, destination, origin, timestamp } = input;
        const status: MessageStatus = "sent";

        const message = Message.build({ content, destination, origin, timestamp, status });

        return await this.messageRepository.create({
            id: message.id,
            content: message.content,
            destination: message.destination,
            origin: message.origin,
            timestamp: message.timestamp,
            status: message.status,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            deletedAt: message.deletedAt
        });
    }
    
}
