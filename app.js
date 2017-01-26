var express = require('express')
var webtorrent = require('webtorrent')
var path = require('path');
var http = require('http');
var fs = require('fs')

var app = express()
var client = new webtorrent()

// Allow Cross-Origin requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
  
app.get('/', function (req, res) {
  res.send('Hello World!')
})

function seedFile (err, file) {
  if (err) throw err;
  console.log(file.length)
  
  client.seed(file, function (torrent) {
    // TODO: save magnetURI in database
    // console.log('Client is seeding ' + torrent.magnetURI)
    console.log('Client is seeding ' + torrent.infoHash)
    console.log(torrent.files[0].length)
    console.log(torrent.files[0].name)
    // TODO: add webseed
  });
}


// app.listen(3000, function () {
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log('Example app listening on port 3000!')
  
  var filename = "torchbearer2010.JPG"
	fs.readFile(filename, seedFile);
	
})