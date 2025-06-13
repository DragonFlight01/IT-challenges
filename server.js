import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import cmdrRoutes from './src/routes/cmdrRoutes.js';
import goalRoutes from './src/routes/goalRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/cmdr', cmdrRoutes);
app.use('/api/goals', goalRoutes);

// Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(PORT, () => {
  if (process.env.USE_MOCK_DATA === 'true') { console.log('Using mock data')};
  if (process.env.USE_MOCK_DATA === 'false') { console.log('Using real data')};
});
