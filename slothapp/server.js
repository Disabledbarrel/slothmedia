const express = require("express");
const cors = require("cors");

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

// Port för anslutning
const PORT = process.env.PORT || 5000;

// Starta server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
