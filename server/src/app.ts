import express from 'express';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

const app = express();

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors({ origin: process.env.FRONTEND_URL as string, credentials: true }));

// mount API routes
app.use('/api/auth', authRoutes); // auth routes
app.use('/api/users', userRoutes); // user routes

// basic health endpoint
app.get('/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err?.status || 500).json({ error: err?.message || 'Internal server error' });
});

export default app;
