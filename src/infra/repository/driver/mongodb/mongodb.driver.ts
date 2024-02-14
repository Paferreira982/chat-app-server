import DriverInterface from "../driver.interface";
import mongoose from 'mongoose';

class MongoDBDriver implements DriverInterface {
    public conn: typeof mongoose;

    constructor() {
        this.conn = mongoose;
        this.connect();
    }

    public connect() {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/ixcsoft';
        this.conn.connect(url);
    }

    public async disconnect(): Promise<void> {
        await this.conn.disconnect();
    }
}

export default new MongoDBDriver();