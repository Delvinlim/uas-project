var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var http = require('http').Server(app)
// var port = 3000

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


// Server Configuration
var port = process.env.PORT || 8080;

http.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})