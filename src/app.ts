import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/database';
import logger from './config/logger';
import adminRoutes from './routes/v1/admin';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
try {
  connectDB();
} catch (error) {
  logger.error('MongoDB connection error:', error);
}

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://192.168.0.100:8081', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Appointment Management System is running successfully');
});

// Health check route
app.get('/health', (req: Request, res: Response) => {
  //const client = getMongoClient();
  
  res.status(200).json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/v1/admin', adminRoutes);

export default app;