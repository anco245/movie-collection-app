import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 5000;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Use user routes
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});