import express from 'express';
import dotenv from 'dotenv';


import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js';

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})