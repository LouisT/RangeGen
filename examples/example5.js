var range = require('../');
require('http').createServer(function (req, res) {
  console.log("Connection, sending A-ZZ!");
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Pipe "A" through "ZZ" to res.
  range.createReadStream('A','ZZ').on('error',function (e) { res.end(JSON.stringify(e)); }).pipe(res);
  // range.CRS('A','ZZ').on('error',function (e) { res.end(JSON.stringify(e)); }).pipe(res);

}).listen(2052);
require('http').createServer(function (req, res) {
  console.log("Connection, sending 1-1000!");
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Pipe "1" through "1000" to res.
  // range.createReadStream(1,1000).on('error',function (e) { res.end(JSON.stringify(e)); }).pipe(res);
  range.CRS(1,1000).on('error',function (e) { res.end(JSON.stringify(e)); }).pipe(res);

}).listen(2082);
require('http').createServer(function (req, res) {
  console.log("Connection, failing to send A-1!");
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Fail to pipe "a" through "1" to res.
  // range.createReadStream('A','1').on('error',function (e) { res.end(JSON.stringify(e)); }).pipe(res);
  range.CRS('A','1').on('error',function (e) { res.end(JSON.stringify(e)); }).pipe(res);

}).listen(2086);
console.log("Listening on ports 2052, 2082, and 2086");
console.log("NOTE: These ports SEEM random, but they're open CloudFlare ports! (https://support.cloudflare.com/hc/en-us/articles/200169156)")
