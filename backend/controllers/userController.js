import db from '../config/database.js';

export const get1080UsbMovies = (req, res) => {
    db.query('SELECT * usbs WHERE quality like 1080', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error querying the database' });
            return;
        }
        res.json(results);
    });
};