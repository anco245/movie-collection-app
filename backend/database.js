/*
    ----ENTRY POINT----
*/

import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
}).promise();

/*
async function addMovie(title, year, format, runtime, quality, Location, pack, edition, genre, seen, type) {    
    title, year, runtime, quality, usb AS 'Location', NULL AS pack, NULL AS edition, genre, seen, type

    title, year, runtime, NULL AS quality, format, pack, edition, genre, seen, type

    seen=="" ? seen=null;
    type=="" ? type=null;
    edition=="" ? edition=null;
    pack=="" ? pack=null;
    Location=="" ? Location=null
    quality


    dvd in case
    dvd location null

    dvd pack null    
    dvd in collection

    dvd criterion
    dvd digibook
    dvd steelbook
    dvd edition null

    dvd null (seen)
    dvd not seen

    dvd null (movie)
    dvd show
    dvd concert
}

async function getCollection() {
    const [rows] = await pool.query(`
        SELECT * FROM (
            SELECT title, year, runtime, quality, usb AS 'Location', NULL AS pack, NULL AS edition, genre, seen, type
            FROM usbs
            UNION
            SELECT title, year, runtime, NULL AS quality, format, pack, edition, genre, seen, type
            FROM collection) as completeCollection;
        `);
    return rows;    
}

const movies = await getCollection();
console.log(movies);
*/

export async function getCollection() {
    const [rows] = await pool.query("SELECT * FROM film");
    return rows;    
}

export async function getMovieById(id) {
    const [entry] = await pool.query("SELECT * FROM film WHERE film_id = ?", [id]);
    return entry[0];
}

//const movie = await getMovieById(5);
const movies = await getCollection();
console.log(movies);