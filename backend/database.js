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
    /*
    await pool.query(`
    CREATE TEMPORARY TABLE temp AS
        SELECT * FROM (
            SELECT title, year, runtime, quality, usb AS 'Location', NULL AS pack, NULL AS edition, genre, seen, type
            FROM usbs
            UNION
            SELECT title, year, runtime, NULL AS quality, format, pack, edition, genre, seen, type
            FROM collection
        ) as movieCollection;
    `);
    */
    await pool.query(`
        CREATE TEMPORARY TABLE temp AS
            SELECT * FROM testcollection as tcollection;
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

    const substrings = given.split('&');
    let infoObject = {};

    substrings.forEach((pair) => {
        const [key, value] = pair.split('=');
        infoObject[key] = value;
    }); 

    let insertInto = [];
    let values = [];

    if(infoObject["title"] !== "undefined")
    {
        insertInto.push("title");
        values.push(infoObject["title"]);
    }

    if (infoObject["format"] !== "undefined") {
        insertInto.push("format");
        values.push(infoObject["format"]);
    }
    
    if (infoObject["pack"] !== "undefined") {
        insertInto.push("pack");
        values.push(infoObject["pack"]);
    }
    
    if (infoObject["edition"] !== "undefined") {
        insertInto.push("edition");
        values.push(infoObject["edition"]);
    }
    
    if (infoObject["year"] !== "undefined") {
        insertInto.push("year");
        values.push(Number(infoObject["year"]));
    }
    
    if (infoObject["director"] !== "") {
        insertInto.push("director");
        values.push(infoObject["director"]);
    }

    if (infoObject["runtime"] !== "undefined") {
        insertInto.push("runtime");
        values.push(Number(infoObject["runtime"]));
    }
    
    if (infoObject["genre"] !== "undefined") {
        insertInto.push("genre");
        values.push(infoObject["genre"]);
    }
    
    if (infoObject["seen"] !== "undefined") {
        insertInto.push("seen");
        values.push(infoObject["seen"]==="true");
    }
    
    if (infoObject["country"] !== "undefined") {
        insertInto.push("country")
        values.push(infoObject["country"]);
    }
    
    if (infoObject["type"] !== "undefined") {
        insertInto.push("type");
        values.push(infoObject["type"]);
    }

    let questions = [];
    insertInto.map(() => {questions.push("?")});

    //let q = `INSERT INTO collection(${insertInto.join(", ")}) VALUES(${questions.join(", ")})`;
    let q = `INSERT INTO testcollection(${insertInto.join(", ")}) VALUES(${questions.join(", ")})`;

    const [entry] = await pool.query(q, values);

    return infoObject;
};

createTemp();