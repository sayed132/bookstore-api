import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { initializeDatabase } from './config/initDatabase';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  },
);

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to the Bookstore API');
});
