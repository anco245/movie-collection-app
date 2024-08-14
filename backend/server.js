import express from 'express';
import { getCollection, getRandomMovie, getMovieByTitle, getBlurays, 
        getGraphData, addPhysicalEntry, createTemp } from './database.js'
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

app.get("/movies/titleOfMovie/:title", async (req, res) => {
    const movieTitle = req.params.title;
    let entry = await getMovieByTitle(movieTitle);

    res.send(entry);
})

app.get("/movies/addPhysicalEntry/:entryInfo", async (req, res) => {
    const entryObject = await addPhysicalEntry(req.params.entryInfo);
    return entryObject;
})

app.get("/movies/bluray", async (req, res) => {
    const movies = await getBlurays();
    res.send(movies);
})

app.get("/movies/graphdata", async (req, res) => {
    const data = await getGraphData();
    res.send(data);
})

app.get("/movies/createTemp", async (req, res) => {
    await createTemp();
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})