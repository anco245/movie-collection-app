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

export async function addPhysicalEntry(given) {

    const substrings = given.split('?');
    let infoObject = {};

    substrings.forEach((pair) => {
        const [key, value] = pair.split('=');
        infoObject[key] = value;
    }); 

    let insertInto = "";
    let values = "";
    let query = "INSERT INTO collection (" + insertInto + ") VALUES (" + values + ")";

    if(infoObject["title"] !== undefined)
    {
        insertInto+="title,";
        values+=infoObject["title"] + ",";
    }

    if (infoObject["format"] != undefined) {
        insertInto+="format,";
        values+=infoObject["format"] + ",";
    }
    
    if (infoObject["pack"] != undefined) {
        insertInto+="pack,";
        values+=infoObject["pack"] + ",";
    }
    
    if (infoObject["edition"] != undefined) {
        insertInto+="edition,";
        values+=infoObject["edition"] + ",";
    }
    
    if (infoObject["year"] != undefined) {
        insertInto+="year,";
        values+=infoObject["year"] + ",";
    }
    
    if (infoObject["director"] != undefined) {
        insertInto+="director,";
        values+=infoObject["director"] + ",";
    }
    
    if (infoObject["runtime"] != undefined) {
        insertInto+="runtime,";
        values+=infoObject["runtime"] + ",";
    }
    
    if (infoObject["genre"] != undefined) {
        insertInto+="genre,";
        values+=infoObject["genre"] + ",";
    }
    
    if (infoObject["seen"] != undefined) {
        insertInto+="seen,";
        values+=infoObject["seen"] + ",";
    }
    
    if (infoObject["country"] != undefined) {
        insertInto+="country,";
        values+=infoObject["country"] + ",";
    }
    
    if (infoObject["type"] != undefined) {
        insertInto+="type,";
        values+=infoObject["type"] + ",";
    }

    insertInto = insertInto.substring(0, insertInto.length() - 1);
    values = values.substring(0, values.length() - 1);

    const [data] = await pool.query(query);

    if(data !== null)
    {
        return infoObject;
    }

};

const result = await createTemp();