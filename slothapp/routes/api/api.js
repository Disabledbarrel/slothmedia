const express = require("express");
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Anslutning till databas
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sloth_media',
    password: 'password',
    database: 'sloth_media'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

// @route GET api/auth
// @descr Load user
// @access Auth
router.get('/', auth, (req, res) => {
    const user_id = req.user.id; // Från token
    
    const select_user_query = 'SELECT email, user_name, avatar from appuser WHERE user_id = ?'; // Skyddar mot SQL-injektioner
    connection.query(select_user_query, [user_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
});

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
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    // Kryptera lösenord med salt
    let hash = bcrypt.hashSync(password, 10);

    // Kontrollera om användare redan finns
    const user_query = `SELECT * FROM appuser WHERE email=?`;
    connection.query(user_query, [email], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.length == 0) {
                const insert_user_query = `INSERT INTO appuser (email, password, user_name, avatar) VALUES(?, ?, ?, ?)`; // Skyddar mot SQL-injektioner
                connection.query(insert_user_query, [email, hash, user_name, avatar],(err, results) => {
                    if(err) {
                        if(err.code == 'ER_DUP_ENTRY') {
                            return res.status(400).json({ errors: [{msg: 'User name already taken!'}] });
                        }
                        return res.send(err);
                    } else {
                        return res.json({
                            data: 'User registered!'
                        });
                    }
                });
            } else {
                return res.status(400).json({ errors: [{msg: 'User already exists'}] });
            }
        }
    });
    
})

// @route POST api/users/login
// @descr login user
// @access Public
router.post('/users/login', [
    check('email', 'Provided email is not valid').isEmail(),
    check('password', 'Password is required').exists()
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Skickar tillbaka felmeddelanden om fälten inte är korrekt ifyllda
    }

    const email  = req.body.email; 
    const password = req.body.password;
    const user_query = `SELECT * FROM appuser WHERE email=?`; // Skyddar mot SQL-injektioner
    connection.query(user_query, [email], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            // Kolla om användare finns
            if(results.length != 0) {
                let hash = results[0].password;
                if(bcrypt.compareSync(password, hash)) {
                    // Skapar jwt om rätt lösenord
                    const payload = {
                        user: {
                            id: results[0].user_id
                        }
                    }
                    jwt.sign(payload, 
                        config.get('jwtToken'),
                        { expiresIn: 360000 },
                        (err, token) => {
                            if(err) return res.send(err);
                            return res.json({ token });
                        });
                } else {
                    return res.status(400).json({ errors: [{msg: 'Invalid credentials'}] });
                }
            } else {
                return res.json({
                    data: 'User not found'
                });
            }
        }
    });
});


// @route GET api/playlists
// @descr read all playlists from current user
// @access Auth
router.get('/playlists', auth, (req, res) => {
    const user_id = req.user.id;
    
    const select_all_playlists_query = 'SELECT * from playlist WHERE user_id = ?'; // Skyddar mot SQL-injektioner
    connection.query(select_all_playlists_query, [user_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
});
// @route POST api/playlists
// @descr create playlist for current user
// @access Auth
router.post('/playlists', auth, (req, res) => {
    const playlist_name  = req.body.playlist_name; 
    const user_id = req.user.id;
    const public_type = req.body.public_type == 'true'; // Parsar sträng till boolean
    const insert_playlist_query = `INSERT INTO playlist (playlist_name, user_id, public_type) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
    connection.query(insert_playlist_query, [playlist_name, user_id, public_type],(err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: 'Playlist created!'
            });
        }
    });
});
// @route PUT api/playlists/:id
// @descr update playlist for current user
// @access Auth
router.put('/playlists/:id', auth, (req, res) => {
    const playlist_id = req.params.id;
    const playlist_name = req.body.playlist_name;
    const user_id = req.user.id; 
    const public_type = req.body.public_type == 'true'; // Parsar sträng till boolean
    const update_playlist_query = `UPDATE playlist SET playlist_name=?, public_type=? WHERE playlist_id=? AND user_id=?`; // Skyddar mot SQL-injektioner
    connection.query(update_playlist_query, [playlist_name, public_type, playlist_id, user_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.changedRows == 0) {
                return res.send('SQL query not correct'); //Om playlist_id eller user_id inte stämmer
            }
            return res.json({
                data: 'Playlist updated!'
            });
        }
    });
});
// @route GET api/playlists/:id
// @descr get single playlist for current user
// @access Auth
router.get('/playlists/:id', auth, (req, res) => {
    const playlist_id = req.params.id;
    const user_id = req.user.id;
    const get_playlist_query = `SELECT * FROM playlist WHERE playlist_id=? AND user_id=?`;
    connection.query(get_playlist_query, [playlist_id, user_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
})
// @route DELETE api/playlists/:id
// @descr delete playlist for current user
// @access Auth
router.delete('/playlists/:id', auth, (req, res) => {
    const playlist_id = req.params.id;
    const user_id = req.user.id;
    const delete_playlist_query = `DELETE FROM playlist WHERE playlist_id=? AND user_id=?`;
    connection.query(delete_playlist_query, [playlist_id, user_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: 'Playlist deleted!'
            });
        }
    });
})

// @route GET api/playlists/:id/songs
// @descr read all songs for playlist owned by current user or if shared user
// @access Auth
router.get('/playlists/:id/songs', auth, (req, res) => {
    const user_id = req.user.id;
    const playlist_id = req.params.id;
    const select_playlist_query = `SELECT user_id, public_type FROM playlist WHERE playlist_id=?`; // Skyddar mot SQL-injektioner
    connection.query(select_playlist_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.length > 0) {
                if(user_id == results[0].user_id || results[0].public_type == true) {
                    const select_songs_query = 'SELECT * from song WHERE playlist_id = ?'; // Skyddar mot SQL-injektioner
                    connection.query(select_songs_query, [playlist_id], (err, results) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            return res.json({
                                data: results
                            });
                        }
                    });
                } else {
                    const check_shared_user_query = 'SELECT user_id FROM share WHERE playlist_id=? AND user_id=?'; // Kolla om användare är delad
                    connection.query(check_shared_user_query, [playlist_id, user_id], (req, results) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            if(results.length > 0) {
                                const select_songs_query = `SELECT * from song WHERE playlist_id = ?`; // Skyddar mot SQL-injektioner
                                connection.query(select_songs_query, [playlist_id], (err, results) => {
                                    if(err) {
                                        return res.send(err);
                                    } else {
                                        return res.json({
                                            data: results
                                        });
                                    }
                                });
                            } else {
                                return res.json({
                                    data: 'access denied'
                                });
                            }
                        }
                    });
                }
            } else {
                return res.send('No match');
            }  
        }
    });
});
// @route POST api/playlist/:id/songs
// @descr add song to playlist owned by current user or shared user
// @access Auth
router.post('/playlists/:id/songs', auth, (req, res) => {
    const user_id = req.user.id;
    const playlist_id = req.params.id;

    const song_name  = req.body.song_name; 
    const song_url = req.body.song_url;
    const select_user_query = 'SELECT user_id FROM playlist WHERE playlist_id=?'; // Skyddar mot SQL-injektioner
    connection.query(select_user_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.length > 0) { // Spellistan finns
                if(user_id == results[0].user_id) { // Inloggad användare äger spellistan
                    const insert_song_query = `INSERT INTO song (song_name, song_url, playlist_id) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
                    connection.query(insert_song_query, [song_name, song_url, playlist_id], (err, results) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            return res.json({
                                data: 'Song added!'
                            });
                        }
                    });
                } else {
                    const check_shared_user_query = 'SELECT user_id FROM share WHERE playlist_id=? AND user_id=?';
                    connection.query(check_shared_user_query, [playlist_id, user_id], (req, results) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            if(results.length > 0) {
                                const insert_song_query = `INSERT INTO song (song_name, song_url, playlist_id) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
                                connection.query(insert_song_query, [song_name, song_url, playlist_id], (err, results) => {
                                    if(err) {
                                        return res.send(err);
                                    } else {
                                        return res.json({
                                            data: 'Song added!'
                                        });
                                    }
                                });
                            } else {
                                return res.json({
                                    data: 'access denied'
                                });
                            }
                        }
                    });
                }
            } else {
                return res.send('No match');
            }
        }
    });  
});
// @route PUT api/playlist/:id/songs/:song_id 
// @descr update song in playlist owned by current user
// @access Auth
router.put('/playlists/:id/songs/:song_id', auth, (req, res) => {
    const user_id = req.user.id;
    const playlist_id = req.params.id;
    const song_id = req.params.song_id;

    const song_name = req.body.song_name;
    const song_url = req.body.song_url;
    const select_user_query = 'SELECT user_id FROM playlist WHERE playlist_id=?'; // Skyddar mot SQL-injektioner
    connection.query(select_user_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.length > 0) {
                if(user_id == results[0].user_id) {
                    const update_song_query = `UPDATE song SET song_name=?, song_url=? WHERE song_id=?`; // Skyddar mot SQL-injektioner
                    connection.query(update_song_query, [song_name, song_url, song_id], (err, results) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            if(results.changedRows == 0) {
                                return res.send('SQL query not correct'); //Om fel song_id
                            }
                            return res.json({
                                data: 'Song updated!'
                            });
                        }
                    });
                } else {
                    return res.json({
                        data: 'access denied'
                    });
                }   
            } else {
                return res.send('No match');
            }
        }
    });
});
// @route DELETE api/playlist/:id/songs/:song_id 
// @descr delete song in playlist owned by current user
// @access Auth
router.delete('/playlists/:id/songs/:song_id', auth, (req, res) => {
    const user_id = req.user.id;
    const playlist_id = req.params.id;
    const song_id = req.params.song_id;

    const select_user_query = 'SELECT user_id FROM playlist WHERE playlist_id=?'; // Skyddar mot SQL-injektioner
    connection.query(select_user_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.length > 0) {
                if(user_id == results[0].user_id) {
                    const delete_song_query = `DELETE FROM song WHERE song_id=?`; // Skyddar mot SQL-injektioner
                    connection.query(delete_song_query, [song_id], (err, results) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            return res.json({
                                data: 'Song deleted!'
                            });
                        }
                    });
                } else {
                    return res.json({
                        data: 'access denied'
                    });
                }
            } else {
                return res.send('No match');
            }
        }
    });
});

// @route GET api/playlists/:id/comments 
// @descr read comments on a public playlist
// @access Auth
router.get('/playlists/:id/comments', auth, (req, res) => {
    const playlist_id = req.params.id;
    const select_all_comments_query = 'SELECT * from user_comment WHERE playlist_id=?'; // Skyddar mot SQL-injektioner
    connection.query(select_all_comments_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
});
// @route POST api/playlists/:id/comments 
// @descr create comment on a public playlist
// @access Auth
router.post('/playlists/:id/comments', auth, (req, res) => {
    const playlist_id = req.params.id;
    const user_id = req.user.id;
    const content = req.body.content;
    
    const public_type_query = 'SELECT public_type FROM playlist WHERE playlist_id=?'; // Skyddar mot SQL-injektioner
    connection.query(public_type_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results[0].public_type == true) {
                const insert_comment_query = `INSERT INTO user_comment (playlist_id, user_id, content) VALUES(?, ?, ?)`; // Skyddar mot SQL-injektioner
                connection.query(insert_comment_query, [playlist_id, user_id, content],(err, results) => {
                    if(err) {
                        return res.send(err);
                    } else {
                        return res.json({
                            data: 'Comment added!'
                        });
                    }
                });
            } else {
                return res.send('Comments not allowed');
            }
        }
    });  
});

// @route GET api/playlists/:id/share 
// @descr Shared users on logged in user's playlist and share type
// @access Auth
router.get('/playlists/:id/share', auth, (req, res) => {
    console.log('prutt2');
    const playlist_id = req.params.id;
    const user_id = req.user.id;

    const select_share_query = `SELECT share.user_id, share.share_type
    FROM share
    JOIN playlist ON share.playlist_id=playlist.playlist_id
    WHERE playlist.user_id=? AND playlist.playlist_id=?`;
    connection.query(select_share_query, [user_id, playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
});
// @route GET api/playlists/share 
// @descr Playlists shared with current user
// @access Auth
router.get('/shared', auth, (req, res) => {
    const user_id = parseInt(req.user.id);

    const select_share_query = `SELECT share.playlist_id, playlist.playlist_name
    FROM share
    JOIN playlist ON share.playlist_id=playlist.playlist_id
    WHERE share.user_id=?`;
    connection.query(select_share_query, [user_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    });
});
// @route POST api/share
// @descr Share playlist
// @access Auth
router.post('/playlists/:id/share', auth, (req, res) => {
    const user_id = req.user.id;
    const playlist_id = req.params.id;
    const shared_user = req.body.shared_user;
    const share_type = req.body.share_type;

    const playlist_owner_query = 'SELECT user_id FROM playlist WHERE playlist_id=?';
    connection.query(playlist_owner_query, [playlist_id], (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            if(results.length >0) { // Spellistan finns
                if(user_id == results[0].user_id) { // inloggad användare äger spellistan
                    const find_user_query = 'SELECT user_id FROM appuser WHERE user_name=?';
                    connection.query(find_user_query, [shared_user], (err, results2) => {
                        if(err) {
                            return res.send(err);
                        } else {
                            if(results2.length > 0) {
                                const insert_share_query = `INSERT INTO share (user_id, playlist_id, share_type) VALUES(?, ?, ?)`;
                                connection.query(insert_share_query, [results2[0].user_id, playlist_id, share_type], (err, results3) => {
                                    if(err) {
                                        return res.send(err);
                                    } else {
                                        return res.json({
                                            data: 'Playlist shared!'
                                        });
                                    }
                                });
                            } else {
                                return res.json({
                                    data: 'User does not exist!'
                                });
                            }
                        }
                    });
                } else {
                    return res.json({
                        data: 'Not allowed to share!'
                    });
                }
            } else {
                return res.json({
                    data: 'Playlist does not exist!'
                });
            }
        }
    }); 
});


module.exports = router;