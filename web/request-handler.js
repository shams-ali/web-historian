var URL = require('url');
var fs = require('fs');
var PATH = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

var documentRoot = './web/public/';

exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var parsedURL = URL.parse(req.url);
  // get path of url use url module and parse. remove trailing '/'
  var pathname = parsedURL.pathname.replace(/\/$/, '');
  
  if (req.method === 'POST') {
    httpHelpers.postHandler(res, req);
  } else if (pathname === '') { 
    pathname = 'index.html'; 
    httpHelpers.serveAssets(res, pathname);
  } else {
    console.log(pathname, 'pathname');
    httpHelpers.serveOtherSites(res, pathname);
  }


  // check if path is valid
    // if it is valid, serve the site

    // else write URL into archvies/site.txt
      //respond with error

  
};