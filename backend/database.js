import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
}).promise();

export async function getCollection() {
    const [rows] = await pool.query("SELECT id, title, year, runtime, format, genre, seen FROM testCollection ORDER BY title ASC");
    return rows;    
}

export async function getRandomMovie() {
    const [entry] = await pool.query("SELECT * FROM testCollection WHERE type = ? order By RAND() LIMIT 1", ["Movie"]);
    return entry;
}

export async function getMovieByTitle(givenTitle) {
    const x = "%" + givenTitle + "%";
    const [entry] = await pool.query("SELECT * FROM testCollection WHERE title like ?", [x]);
    return entry;
}

export async function getBlurays() {
    const [entry] = await pool.query("SELECT * FROM testCollection WHERE location = ? ORDER BY title ASC", ["bluray"]);
    return entry;
}

export async function getGraphData() {
    const [data] = await pool.query("SELECT FLOOR( year / 10) * 10 AS decade, COUNT(*) AS movie_count FROM testCollection GROUP BY decade order by decade asc");
    return data;
}

export async function addPhysicalEntry(given) {

    let insertInto = [];
    let values = [];

    if(given["title"] !== "undefined")
    {
        insertInto.push("title");
        values.push(given["title"]);
    }

    if (given["format"] !== "undefined") {
        insertInto.push("format");
        values.push(given["format"]);
    }
    
    if (given["pack"] !== "undefined") {
        insertInto.push("pack");
        values.push(given["pack"]);
    }
    
    if (given["edition"] !== "undefined") {
        insertInto.push("edition");
        values.push(given["edition"]);
    }
    
    if (given["year"] !== "undefined") {
        insertInto.push("year");
        values.push(Number(given["year"]));
    }
    
    if (given["director"] !== "") {
        insertInto.push("director");
        values.push(given["director"]);
    }

    if (given["runtime"] !== "undefined") {
        insertInto.push("runtime");
        values.push(Number(given["runtime"]));
    }
    
    if (given["genre"] !== "undefined") {
        insertInto.push("genre");
        values.push(given["genre"]);
    }
    
    if (given["seen"] !== "undefined") {
        insertInto.push("seen");
        values.push(given["seen"]);
    }
    
    if (given["country"] !== "undefined") {
        insertInto.push("country")
        values.push(given["country"]);
    }
    
    if (given["type"] !== "undefined") {
        insertInto.push("type");
        values.push(given["type"]);
    }

    let questions = [];
    insertInto.map(() => {questions.push("?")});

    //let q = `INSERT INTO collection(${insertInto.join(", ")}) VALUES(${questions.join(", ")})`;
    let q = `INSERT INTO testcollection(${insertInto.join(", ")}) VALUES(${questions.join(", ")})`;

    await pool.query(q, values);
};

export async function updateEntry(given) {

    let q = `
        UPDATE testCollection
        SET title = ?, year = ?, runtime = ?, format = ?, genre = ?, seen = ?
        WHERE id = ?
    `

    await pool.query(q, [given["title"], given["year"], 
                        given["runtime"], given["format"],
                        given["genre"], given["seen"],
                        given["id"]]);
}