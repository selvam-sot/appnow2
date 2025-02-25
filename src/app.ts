import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Appointment Management System is running successfully');
});

// Health check route for Azure
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

export default app;