require('dotenv').config()
const path = require("path");
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

app.use(
    cors({
	origin: "http://localhost:3000",
        credentials: true,
    })
)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())
// add middlewares
 app.use(express.static(path.join(__dirname, "..", "pixel-game", "build")));
 app.use(express.static("public"));

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const pixelsRouter = require('./routes/pixels')
app.use('/pixels', pixelsRouter)

const settingsRouter = require('./routes/settings')
app.use('/settings', settingsRouter)

const galleryRouter = require('./routes/gallery')
app.use('/gallery', galleryRouter)

app.use((req, res, next) => {
res.sendFile(path.join(__dirname, "..", "pixel-game", "build", "index.html"));
});

var port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log("Server started...");
    console.log("Running on port", port);
    console.log(new Date());
})
