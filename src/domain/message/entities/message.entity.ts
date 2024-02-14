import { Entity } from "@/domain/@shared/entities/entity.abstract";
import { MessagePropsType, MessageEntityPropsType, MessageStatus } from "./types";

export class Message extends Entity<MessagePropsType> {
    private constructor({
        id,
        origin,
        destination,
        content,
        status,
        timestamp,
        createdAt,
        updatedAt,
        deletedAt,
    }: MessageEntityPropsType) {
        const props = { origin, destination, content, status, timestamp };
        super('Message', { id, createdAt, deletedAt, updatedAt, props });
    }

    public static build({
        origin,
        destination,
        content,
        status,
        timestamp,
    }: MessagePropsType): Message {
        return new Message({
            ...Entity.buildDefault(),
            origin,
            destination,
            content,
            status,
            timestamp,
        });
    }

    public static with({
        id,
        origin,
        destination,
        content,
        status,
        timestamp,
        createdAt,
        updatedAt,
        deletedAt,
    }: MessageEntityPropsType): Message {
        return new Message({
            id,
            origin,
            destination,
            content,
            status,
            timestamp,
            createdAt,
            updatedAt,
            deletedAt,
        });
    }

    // BUSINESS LOGIC
    public updateStatus(status: MessageStatus): void {
        this.props.status = status;
    }

    // GETTERS & SETTERS
    public get origin(): string {
        return this.props.origin;
    }

    public get destination(): string {
        return this.props.destination;
    }

    public get content(): string {
        return this.props.content;
    }

    public get status(): MessageStatus {
        return this.props.status;
    }

    public get timestamp(): number {
        return this.props.timestamp;
    }
}