var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var http = require('http').Server(app)
var port = 3000

// Get static files (js css images)
app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/suit-game/assets')))
// app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/suit', (req, res) =>{
  res.sendFile(__dirname + '/suit-game/index.html')
})

app.listen(port, () => {
  console.log(`testing using express listening at http://localhost:${port}`);
})