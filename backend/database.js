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

export async function getBlurays() {
    const [entry] = await pool.query("SELECT * FROM temp WHERE location = ? ORDER BY title ASC", ["bluray"]);
    return entry;
}

export async function getGraphData() {
    const [data] = await pool.query("SELECT FLOOR( year / 10) * 10 AS decade, COUNT(*) AS movie_count FROM temp GROUP BY decade order by decade asc");
    return data;
}

/*
export async function addPhysicalEntry(given) {

    //parse string and store it as object
    //might be able to use loop to look for key value pairs

    const substrings = given.split('?');
    let infoObject = {};

    substrings.forEach((pair) => {
        const [key, value] = pair.split('=');
        infoObject[key] = value;
    }); 

    let insertInto = "";
    let values = "";
    let query = "INSERT INTO collection ({insertInto}) VALUES ({values})";

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
    format VARCHAR(20) NOT NULL,
    pack VARCHAR(100),
    edition VARCHAR(50),
    year INT NOT NULL, 
    director VARCHAR(100),
    runtime INT NOT NULL,
    genre VARCHAR(100),
    seen boolean default true,
    country VARCHAR(50) default "USA",
    -- franchise VARCHAR(100),
    type VARCHAR(20) default "Movie"

    for(let i = 0; i < infoObject.length; i++)
    {
        insertInto+=infoObject+
    }

    insertInto = insertInto + infoObject["title"]
    if(infoObject["title"] !== null)
    {
        insertInto+=infoObject[];
        values+=""
    }

    if(infoObject["title"] != null)
    {
        insertInto+=""
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

    (
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
    type)

};
*/

const result = await createTemp();