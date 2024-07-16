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

export async function createTemp() {
    await pool.query(`
    CREATE TEMPORARY TABLE temp AS
        SELECT * FROM (
            SELECT title, year, runtime, quality, usb AS 'Location', NULL AS pack, NULL AS edition, genre, seen, type
            FROM usbs
            UNION
            SELECT title, year, runtime, NULL AS quality, format, pack, edition, genre, seen, type
            FROM collection) as completeCollection;
    `);
}

export async function getCollection() {
    const [rows] = await pool.query("SELECT * FROM temp ORDER BY title ASC");
    return rows;    
}

export async function getRandomMovie() {
    const [entry] = await pool.query("SELECT * FROM temp WHERE type = ? order By RAND() LIMIT 1", ["Movie"]);
    return entry;
}

export async function getMovieByTitle(givenTitle) {
    const x = "%" + givenTitle + "%";
    const [entry] = await pool.query("SELECT * FROM temp WHERE title like ?", [x]);
    return entry;
}

/*
export async function getMovieByTitle(givenTitle) {

    const likeQuery = `%${givenTitle}%`;

    const [entry] = await pool.query(`
        SELECT * FROM temp WHERE title like ?
        `, [likeQuery]);
    return entry;
}

export async function addPhysicalEntry(
    title, 
    format,
    pack,
    edition,
    year, 
    director,
    runtime,
    genre,
    seen,
    country,
    type) {

    let query = "";

    if(title != null)
    {
        query = query + ""
    } else if (format != null) {

    } else if (pack != null) {
     
    } else if (edition != null) {
     
    } else if (year != null) {
     
    } else if (director != null) {
     
    } else if (runtime != null) {
     
    } else if (genre != null) {
     
    } else if (seen != null) {
     
    } else if (country != null) {
     
    } else if (type != null) {
     
    }

    if(query != null)
    {

    }

};

export async function addUsbEntry() {

}
*/

const result = await createTemp();