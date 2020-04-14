const express = require("express");
const mysql = require('mysql');
const cors = require("cors");

// Skapa instans av express, initierar appen
const app = express();

// Queries
const select_all_users_query = 'SELECT * from appuser';

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
console.log(connection);

// Middleware för dependencies
app.use(cors());

// Port för anslutning
const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.get('/users', (req, res) => {
    connection.query(select_all_users_query, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
app.post('/', (req, res) => res.send('Hello POST World!'));

// Starta server
app.listen(PORT, () => console.log(`Server starded on port ${PORT}`));
