// src/server.ts
import app from './app';
import winston from 'winston';

// Configure Winston logger 
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

// Get port from environment variable
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    console.error('UNHANDLED REJECTION:', err);

  // Allow the process to continue - only exit for critical errors
  // process.exit(1);
});