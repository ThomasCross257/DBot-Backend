const express = require('express')
const session = require('express-session');
const path = require('path');
const client = require('../dbot/bot').client;
const app = express()
const cors = require("cors");
require('dotenv').config()

const PORT = process.env.PORT | 3001;

const SERVER_SECRET = process.env.SERVER_SECRET;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(session({
    secret: SERVER_SECRET,
    maxAge: 1000 * 60 * 60, // 1 Hour <---- feel free to change this
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})