import mongoose from 'mongoose';
import config from "./config";

export function initDb() {
    const dbUri = config.database.uri;
    return mongoose.connect(dbUri);
}

export function closeDb() {
    return mongoose.disconnect();
}