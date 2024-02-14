import { MessageEntityPropsType } from "@/domain/message/entities/types";
import RepositoryInterface from "../../repository.interface";
import MongoDBDriver from "../../driver/mongodb/mongodb.driver";
import MessageSchema from "./message.schema";

class MessageRepository implements RepositoryInterface<MessageEntityPropsType> {

    public constructor() {
        try {
            MongoDBDriver.conn.model('Message', MessageSchema);
        } catch (error) {
            console.warn("Message Model already registered and compiled.");
        }
    }

    public async create(data: MessageEntityPropsType): Promise<MessageEntityPropsType> {
        const MessageModel = MongoDBDriver.conn.model('Message');
        const instance = new MessageModel(data);
        return await instance.save();
    }

    public async update(data: Partial<MessageEntityPropsType>): Promise<MessageEntityPropsType> {

        const MessageModel = MongoDBDriver.conn.model('Message');

        const instance = await MessageModel.findOne({ id: data?.id });

        if (Object.keys(data).length < 2) {
            throw new Error('No data to update');
        }

        if (!instance) {
            throw new Error('Message Model not found');
        }

        Object.keys(data).forEach((key) => {
            if (key !== 'id' && key !== '_id') {
                instance.set(key, data[key]);
            }
        });
        return await instance.save() as MessageEntityPropsType;
    }

    public async findByDestination(destination: string): Promise<MessageEntityPropsType[]> {
        const MessageModel = MongoDBDriver.conn.model('Message');
        return await MessageModel.find({ destination });
    }

    public async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async findById(id: string): Promise<MessageEntityPropsType> {
        const MessageModel = MongoDBDriver.conn.model('Message');
        return await MessageModel.findOne({ id });
    }

    public async findAll(): Promise<MessageEntityPropsType[]> {
        throw new Error("Method not implemented.");
    }

    public async getChatHistory(origin: string, destination: string): Promise<MessageEntityPropsType[]> {
        const MessageModel = MongoDBDriver.conn.model('Message');
        return (await MessageModel.find({ 
            $or: [
                { destination, origin },
                { destination: origin, origin: destination }
            ]
        })) || [];
    }
}

export default new MessageRepository();
