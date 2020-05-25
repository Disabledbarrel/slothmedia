const express = require("express");
const cors = require("cors");
const path = require('path');

// Skapa instans av express, initierar appen
const app = express();

// Middleware för dependencies
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const api = require("./routes/api/api");

// Dirigerar till api
app.use("/api", api);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Statisk mapp
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Port för anslutning
const PORT = process.env.PORT || 3001;

// Starta server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
