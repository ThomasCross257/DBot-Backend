/**
 * Going to move this outside
 * the dbot folder and into its own
 * folder
 */
const http = require('http');
const express = require('express')
const app = express()
const server = http.createServer(app);
const settings = require("./settings.json");
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
})

const listener = server.listen(8000, function(){
    console.log("Dashboard listening on port " + listener.address().port);
})