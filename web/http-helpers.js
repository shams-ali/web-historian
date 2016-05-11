var PATH = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var documentRoot = './web/public/';

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  //create filepath to asset
  var filePath = documentRoot + asset;

  //read asset and serve if found, else respond with 404
  fs.readFile( filePath, (err, file) => {
    if(err){
      returnWithStatusCode(res, 404);
    } else {
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = contentTypes[PATH.extname(asset)];

      res.writeHead(200, headers);
      res.end(file);
    }
  });
};

var contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif'
};

var returnWithStatusCode = function(response, statusCode) {
  response.writeHead(statusCode, defaultCorsHeaders);
  response.end();
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};



// As you progress, keep thinking about what helper functions you can put here!
