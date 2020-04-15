const express = require("express");
const mysql = require('mysql');

const router = express.Router();

// Anslutning till databas
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'elin',
    password: 'password',
    database: 'slothmedia'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

// Refererar till uppsatt route
router.get('/', (req, res) => res.send('Hello World'));

// Get Playlists
router.get('/playlists', (req, res) => {
    const select_all_playlists_query = 'SELECT * from playlist';
    connection.query(select_all_playlists_query, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
// Create Playlist
router.post('/playlists', (req, res) => {
    const playlist_name  = req.body.playlist_name; 
    const user_id = req.body.user_id;
    const public_type = req.body.public_type;
    const insert_playlist_query = `INSERT INTO playlist (playlist_name, user_id, public_type) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
    connection.query(insert_playlist_query, [playlist_name, user_id, public_type],(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Låtlista skapad!')
        }
    });
});

module.exports = router;