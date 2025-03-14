// src/server.ts
import app from './app';

// Get port from environment variable
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION:', err);

  // Allow the process to continue - only exit for critical errors
  // process.exit(1);
});