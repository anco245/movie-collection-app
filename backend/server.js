import express from 'express';
import { getCollection, getRandomMovie, getMovieByTitle } from './database.js'
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/movies", async (req, res) => {
    const movies = await getCollection();
    res.send(movies);
})

app.get("/movies/getRandomMovie", async (req, res) => {
    const movie = await getRandomMovie();
    res.send(movie);
})

app.get("/movies/:title", async (req, res) => {
    const movieTitle = req.params.title;
    let entry = await getMovieByTitle(movieTitle);

    res.send(entry);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})