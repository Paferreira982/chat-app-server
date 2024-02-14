import { EntityPropsType } from "@/domain/@shared/entities/types";

export type MessageStatus = 'sent' | 'received' | 'viewed';

export type MessagePropsType = {
    content: string;
    status: MessageStatus;
    origin: string;
    destination: string;
    timestamp: number;
}

export type MessageEntityPropsType = MessagePropsType & EntityPropsType;
