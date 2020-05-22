'use strict';

const http = require('http');

http.createServer(function(req, res) {

  console.log(res);
  
  res.writeHead(200, {'Content-Type': 'text/plain: charset=utf-8'});
  res.write("Hello World");
  res.end();

  console.log(res);

}).listen(3000);