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

    };

export async function addUsbEntry() {

}

const result = await createTemp();