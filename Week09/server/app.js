import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router as signupRouter } from './routes/signup.js';

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(',') ?? '*' }));
app.use(express.json());

// 路由
app.use('/api/signup', signupRouter);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 500
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
