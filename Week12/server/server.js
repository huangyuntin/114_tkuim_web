import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import authRouter from './routes/auth.js';
import signupRouter from './routes/signup.js';

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);  
app.use('/api/signup', signupRouter);

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  });
}