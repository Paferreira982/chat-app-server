import { Usecase } from "@/usecases/usecase.interface";
import { UpdateMessageInputDto, UpdateMessageOutputDto } from "./update-status.usecase.dtos";
import { MessageEntityPropsType, MessagePropsType, MessageStatus } from "@/domain/message/entities/types";
import { Message } from "@/domain/message/entities/message.entity";
import RepositoryInterface from "@/infra/repository/repository.interface";

export class UpdateMessageUsecase implements Usecase<UpdateMessageInputDto, UpdateMessageOutputDto> {

    public constructor(
        private readonly messageRepository: RepositoryInterface<MessageEntityPropsType>,
    ) {}

    public async execute(input: UpdateMessageInputDto): Promise<MessagePropsType & { id: string }> {
        const { id, status } = input;

        const rawMessage = await this.messageRepository.findById(id);

        const message = Message.with({
            id: rawMessage.id,
            origin: rawMessage.origin,
            destination: rawMessage.destination,
            content: rawMessage.content,
            status: rawMessage.status,
            timestamp: rawMessage.timestamp,
            createdAt: rawMessage.createdAt,
            updatedAt: new Date(),
            deletedAt: rawMessage.deletedAt
        });

        message.updateStatus(status);
        const updatedMessage = await this.messageRepository.update({
            id: message.id,
            status: message.status
        });
        return updatedMessage;
    }
    
}
