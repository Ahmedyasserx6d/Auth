import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();


// Middleware to parse JSON request bodies
app.use(express.json());
// auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB

connectDB();

 // listening 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});