import express from 'express';
import cors from 'cors';
import roomRoutes from './routes/room.routes';
import sessionRoutes from './routes/session.routes';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/rooms', roomRoutes);
app.use('/', sessionRoutes); // sessions et events imbriqués


app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route introuvable' });
});

export default app;