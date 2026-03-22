import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './lib/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
