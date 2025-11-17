// IMPORTS
import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello world' });
});

// PORT LISTEN
app.listen(5000, () => {
  console.log(`Server running on port ${PORT}`);
});
