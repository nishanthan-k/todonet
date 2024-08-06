import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use('/api/todo', todoRoutes);



app.listen(PORT, () => {
  console.log(`Server connected ${PORT}`);
})