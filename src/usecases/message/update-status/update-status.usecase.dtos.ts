import { MessageStatus } from "@/domain/message/entities/types";

export type UpdateMessageInputDto = {
    id: string;
    status: MessageStatus;
};

export type UpdateMessageOutputDto = {
    id: string;
};