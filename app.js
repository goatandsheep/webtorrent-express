var express = require('express')
var createTorrent = require('create-torrent')
var path = require('path');
var http = require('http');
var fs = require('fs')

var app = express()
// var client = new webtorrent()

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

// function seedFile (err, file) {
//   if (err) throw err;
//   console.log(file.filename)
//   console.log(file.name)
  
//   createTorrent(file, function (torrent) {
//     // TODO: save magnetURI in database
//     console.log('Client is seeding ' + torrent.magnetURI)
//     // console.log('Client is seeding ' + torrent.infoHash)
//     console.log(torrent.files[0].length)
//     console.log(torrent.files[0].name)
//     // TODO: add webseed
//   });
// }


// app.listen(3000, function () {
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log('Example app listening on port 3000!')
  
  var filename = "jquery-3.1.1.min.js"
  function ribbons() {
    console.log(filename)
  }
// 	fs.open(filename, 'r', seedFile);
	
// 	fs.open(filename, 'r', function seedeFile (err, file) {
  fs.readFile(filename, function seedeFile (err, filey) {
    if (err) throw err;
    
    if (Buffer.isBuffer(filey)) {
      console.log("hey")
    }
    
    filey.name = filename
    console.log(filey.length)
    
    var webSeeds = ["https://code.jquery.com/jquery-3.1.1.min.js"]
    var opts = {
      urlList: webSeeds
    }
    
    createTorrent(filey, opts, function (torrent) {
      console.log(filey.length)
      if (err) throw err
      
      fs.writeFile('my.torrent', torrent)
      
      // Note: `create-torrent file -o my.torrent` works
      
      // TODO: save magnetURI in database
      console.log('Client is seeding ' + torrent)
      // console.log('Client is seeding ' + torrent.infoHash)
      // console.log(torrent.files[0].length)
      // console.log(torrent.files[0].name)
      // TODO: add webseed
    });
    
  })
	
})