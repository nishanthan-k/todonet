import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todo.route.js';
import authRoutes from './routes/auth.route.js';
import { verifyJWT } from './middlewares/auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.use('/api/todo', verifyJWT, todoRoutes);
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Server connected ${PORT}`);
})