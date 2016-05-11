var URL = require('url');
var fs = require('fs');
var PATH = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

var documentRoot = './web/public/';

exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  
  // get path of url use url module and parse. remove trailing '/'
  var pathname = URL.parse(req.url).pathname.replace(/\/$/, '');

  if (pathname === '') { pathname = 'index.html'; }

  httpHelpers.serveAssets(res, pathname);
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

