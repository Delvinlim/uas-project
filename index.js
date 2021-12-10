var express = require('express')
var app = express()
var fs = require('fs')
const { Http2ServerRequest } = require('http2')
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

// var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var port = process.env.PORT || 8080;

http.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})

// app.listen(port, () => {
//   console.log(`testing using express listening at http://localhost:${port}`);
// })