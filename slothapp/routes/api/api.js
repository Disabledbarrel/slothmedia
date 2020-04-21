const express = require("express");
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

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

// @route POST api/users
// @descr register user
// @access Public
router.post('/users', [
    check('user_name', 'User name is required').not().isEmpty(),
    check('email', 'Provided email is not valid').isEmail(),
    check('password', 'Password needs to be 6 or more characters').isLength({ min: 6 })
], 
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Skickar tillbaka felmeddelanden om fälten inte är korrekt ifyllda
    }

    const email  = req.body.email; 
    const password = req.body.password;
    const user_name = req.body.user_name;

    // Kryptera lösenord
    let hash = bcrypt.hashSync(password, 10);

    // Kontrollera om användare redan finns
    const user_query = `SELECT * FROM appuser WHERE email=?`
    connection.query(user_query, [email], (err, results) => {
        if(results.length == 0) {
            const insert_user_query = `INSERT INTO appuser (email, password, user_name) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
            connection.query(insert_user_query, [email, hash, user_name],(err, results) => {
                if(err) {
                    return res.send(err)
                } else {
                    return res.send('User registered!')
                }
            });
        } else {
            return res.status(400).json({ errors: [{msg: 'User already exists'}] });
        }
    });
    
})

// @route GET api/playlists
// @descr read all playlists
// @access Public/Auth
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
// Get single Playlist
router.get('/playlists/:id', (req, res) => {
    const id = req.params.id;
    const select_playlist_id_query = `SELECT * from playlist WHERE playlist_id=?`; // Skyddar mot SQL-injektioner
    connection.query(select_playlist_id_query, [id], (err, results) => {
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
            return res.send('Playlist created!')
        }
    });
});
// Update Playlist
router.put('/playlists/:id', (req, res) => {
    const id = req.params.id;
    const playlist_name = req.body.playlist_name;
    //const user_id = req.body.user_id; ska plockas från session
    const public_type = req.body.public_type;
    const update_playlist_query = `UPDATE playlist SET playlist_name=?, public_type=? WHERE playlist_id=?`; // Skyddar mot SQL-injektioner
    connection.query(update_playlist_query, [playlist_name, public_type, id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Playlist updated!')
        }
    });
});
// Delete Playlist
router.delete('/playlists/:id', (req, res) => {
    const id = req.params.id;
    const delete_playlist_query = `DELETE FROM playlist WHERE playlist_id=?`;
    connection.query(delete_playlist_query, [id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Playlist deleted!')
        }
    });
})

// Get songs
router.get('/songs', (req, res) => {
    const select_all_songs_query = 'SELECT * from song';
    connection.query(select_all_songs_query, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
// Get single song
router.get('/songs/:id', (req, res) => {
    const id = req.params.id;
    const select_songs_id_query = `SELECT * from song WHERE song_id=?`; // Skyddar mot SQL-injektioner
    connection.query(select_songs_id_query, [id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
// Add song
router.post('/songs', (req, res) => {
    const song_name  = req.body.song_name; 
    const playlist_id = req.body.playlist_id;
    const song_url = req.body.song_url;
    const insert_song_query = `INSERT INTO song (song_name, song_url, playlist_id) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
    connection.query(insert_song_query, [song_name, song_url, playlist_id],(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Song added!')
        }
    });
});
// Update song
router.put('/songs/:id', (req, res) => {
    const id = req.params.id;
    const song_name = req.body.song_name;
    const song_url = req.body.song_url;
    const update_song_query = `UPDATE song SET song_name=?, song_url=? WHERE song_id=?`; // Skyddar mot SQL-injektioner
    connection.query(update_song_query, [song_name, song_url, id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Song updated!')
        }
    });
});
// Delete song
router.delete('/songs/:id', (req, res) => {
    const id = req.params.id;
    const delete_song_query = `DELETE FROM song WHERE song_id=?`; // Skyddar mot SQL-injektioner
    connection.query(delete_song_query, [id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Song deleted!')
        }
    });
});

// Get user comments
router.get('/playlists/:id/comments', (req, res) => {
    const playlist_id = req.params.id;
    const select_all_comments_query = 'SELECT * from user_comment WHERE playlist_id=?'; // Skyddar mot SQL-injektioner
    connection.query(select_all_comments_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
// Add comment
router.post('/playlists/:id/comments', (req, res) => {
    const playlist_id = req.params.id; 
    const user_id = req.body.user_id; //ska plockas från session
    const content = req.body.content;
    const insert_comment_query = `INSERT INTO user_comment (playlist_id, user_id, content) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
    connection.query(insert_comment_query, [playlist_id, user_id, content],(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Comment added!')
        }
    });
});

// Shared users on playlist
// Här ska användare som har tillgång till en spellista listas, tanken är att ägaren av spellistan ska vem man delat till och hur
router.get('/playlists/:id/share', (req, res) => {
    const playlist_id = req.params.id;
    //const user_id = req.body.user_id; // ska plockas från session
    const select_share_query = `SELECT user_id, share_type FROM share WHERE playlist_id=?`;
    connection.query(select_share_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
// My shared playlists
// Här ska det listas vilka spellistor som en annan användre delat med mig

// Share playlist
router.post('/share', (req, res) => {
    const shared_user = req.body.shared_user;
    const playlist_id = req.body.playlist_id;
    const share_type = req.body.share_type;
    // Plocka fram inloggad användares id från session, kolla att det verkligen är den inloggade användaren som äger spellistan
    const insert_share_query = `INSERT INTO share (user_id, playlist_id, share_type) VALUES(?, ?, ?)`;
    connection.query(insert_share_query, [shared_user, playlist_id, share_type], (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Playlist shared!')
        }
    });
});


module.exports = router;