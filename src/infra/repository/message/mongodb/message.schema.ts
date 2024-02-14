import MongoDBDriver from "../../driver/mongodb/mongodb.driver";
import { MessageEntityPropsType } from "@/domain/message/entities/types";

const Schema = MongoDBDriver.conn.Schema;

const MessageSchema = new Schema<MessageEntityPropsType>({
        id: {
            type: String,
            required: true,
            unique: true,
            indexes: true
        },
        origin: {
            type: String,
            required: true,
            indexes: true
        },
        destination: {
            type: String,
            required: true,
            indexes: true
        },
        content: {
            type: String,
            required: true,
            minlength: 1,
        },
        status: {
            type: String,
            required: true,
            enum: ['sent', 'received', 'viewed'],
            default: 'sent'
        },
        timestamp: {
            type: Number,
            required: true,
            default: Date.now()
        },
    },
    {
        timestamps: true,
    }
);

export default MessageSchema;
