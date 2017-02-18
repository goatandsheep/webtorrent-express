var express = require('express')
// var webtorrent = require('create-torrent')
var path = require('path');
var http = require('http');
var fs = require('fs')

var bcrypt = require('bcrypt')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

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

function seedFile (err, file) {
  if (err) throw err;
  console.log(file.filename)
  console.log(file.name)
  
  client.seed(file, function (torrent) {
    // TODO: save magnetURI in database
    console.log('Client is seeding ' + torrent.magnetURI)
    // console.log('Client is seeding ' + torrent.infoHash)
    console.log(torrent.files[0].length)
    console.log(torrent.files[0].name)
    // TODO: add webseed
  });
}


// app.listen(3000, function () {
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log('Example app listening on port 3000!')
  
  var filename = "torchbearer2010.JPG"
  function ribbons() {
    console.log(filename)
  }
// 	fs.open(filename, 'r', seedFile);
	
// 	fs.open(filename, 'r', function seedeFile (err, file) {
  fs.readFile(filename, function seedeFile (err, file) {
    if (err) throw err;
    
    file.name = filename
    
    

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log("bcrypt: ")
        console.log(hash)
    });
});
    
    /*
    client.seed(file, function (torrent) {
      // TODO: save magnetURI in database
      console.log('Client is seeding ' + torrent.magnetURI)
      // console.log('Client is seeding ' + torrent.infoHash)
      console.log(torrent.files[0].length)
      console.log(torrent.files[0].name)
      // TODO: add webseed
    });
    */
  })
	
})