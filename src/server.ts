import app from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Start the server
// Azure Web Apps expects port 8080, or it uses the PORT environment variable
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});