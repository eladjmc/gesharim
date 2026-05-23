import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorMiddleware);

export default app;
