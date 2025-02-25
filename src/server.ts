import app from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});