import express from 'express';
import {getCollection, getMovieById} from './database.js'
import cors from 'cors';
app.use(cors());

const app = express();

app.get("/movies", async (req, res) => {
    const movies = await getCollection();
    res.send(movies);
})

app.get("/movies/:id", async (req, res) => {
    const num = req.params.id;
    const movie = await getMovieById(num);
    res.send(movie);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})