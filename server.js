require('dotenv').config()
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

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const pixelsRouter = require('./routes/pixels')
app.use('/pixels', pixelsRouter)

var port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server started...");
    console.log("Running on port", port);
})