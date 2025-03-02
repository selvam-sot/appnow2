import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import logger from './logger';

// Store the client connection
let mongoClient: MongoClient | null = null;

const connectDB = async (): Promise<void> => {
    try {
        logger.info('Connecting to MongoDB...');
        
        // First try connecting with the MongoDB native driver
        mongoClient = new MongoClient('mongodb://appointmentnowdb:3mQCMfdjGkJhkKdHKORs4xDuHarCDVs8kSnxGWouwVV1hzE6wxfkBFGncNjN9s8TRbz7aNvKU0wzACDbGCABtQ==@appointmentnowdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@appointmentnowdb@');
        await mongoClient.connect();
        logger.info('Successfully connected to MongoDB with native driver!');
        
        // Set strictQuery to false to suppress the deprecation warning
        mongoose.set('strictQuery', false);
        
        // Now try with Mongoose - only after confirming MongoDB connection works
        try {
            await mongoose.connect('mongodb://appointmentnowdb:3mQCMfdjGkJhkKdHKORs4xDuHarCDVs8kSnxGWouwVV1hzE6wxfkBFGncNjN9s8TRbz7aNvKU0wzACDbGCABtQ==@appointmentnowdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@appointmentnowdb@');
            logger.info('Successfully connected to MongoDB with Mongoose!');
        } catch (mongooseErr) {
            logger.error('Mongoose connection failed, but MongoDB native driver is working:', mongooseErr);
            logger.info('Application will continue using the MongoDB native driver only');
        }
    } catch (err) {
        logger.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};

// Function to get the MongoDB client (if mongoose fails)
const getMongoClient = (): MongoClient | null => {
    return mongoClient;
};

// Function to get the database
const getDb = (dbName: string = 'appnow'): any => {
    if (!mongoClient) {
        throw new Error('MongoDB client not initialized. Call connectDB first.');
    }
    return mongoClient.db(dbName);
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
    if (mongoClient) {
        await mongoClient.close();
        logger.info('MongoDB connection closed');
    }
    process.exit(0);
});

export default connectDB;
export { getMongoClient, getDb };
