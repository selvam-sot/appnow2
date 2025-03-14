// src/app.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Import the simple database connection
//import connectDB, { getMongoClient } from './config/database';
import { errorHandler, notFound } from './middlewares/error.middleware';

// Import routes
import adminRoutes from './routes/v1/admin';
import userRoutes from './routes/v1/user';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
// connectDB()
//   .then(() => console.log('Database connection initialized'))
//   .catch(err => console.error('Failed to initialize database connection:', err));

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
app.use('/api/v1/user', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;