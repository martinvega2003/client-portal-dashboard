import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app.js';
import { testDb, pool } from './database.js'; // safe to import if you have database.ts

const PORT = Number(process.env.PORT ?? 3443);

const start = async () => {
  try {
    await testDb();
  } catch (err) {
    console.warn('DB test failed or not available (continuing to start server):', err);
  }

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
