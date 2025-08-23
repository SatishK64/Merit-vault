/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import router from '../src/backend/route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://merit-vault.vercel.app/' : '*',
}));

app.use('/api',router);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
export default app;