import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import workRoutes from './routes/workRoutes.js';
import createAdmin from './config/createAdmin.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.use('/uploads', express.static('uploads'));
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use('/api/auth', authRoutes);
app.use('/api/works', workRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then( async () => {
        console.log('MongoDB connected')
        await createAdmin();
    })
    .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/works', workRoutes);

app.listen(5000, async () => {
    console.log('Server is running on port 5000');
});