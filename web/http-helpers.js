var PATH = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var documentRoot = './web/public/';

var contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif'
};

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.returnWithStatusCode = function(response, statusCode) {
  response.writeHead(statusCode, exports.headers);
  response.end();
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  //read asset and serve if found, else respond with 404
  var filePath = documentRoot + asset;
  fs.readFile( filePath, (err, file) => {
    if (err) {
      console.log('cannot find file');
      // throw(err);
      exports.returnWithStatusCode(res, 404);
    } else {
      console.log('found file');
      var headers = exports.headers;
      headers['Content-Type'] = contentTypes[PATH.extname(asset)];

      res.writeHead(200, headers);
      res.end(file);
    }
  });
};


exports.serveOtherSites = function(res, asset, callback) {
  var filePath = archive.paths.archivedSites + asset;
  //serve archived files
  console.log('file path in serveOtherSites is ', filePath);
  // check if can access folder with name asset it archive.archivedSites
  fs.access(filePath, (err) =>{
    if (err) {
      console.log('No access or file does not exist');
      exports.returnWithStatusCode(res, 404);
    }

    fs.readFile(filePath, (err, file) => {
      if (err) {
        exports.returnWithStatusCode(res, 404);
      }

      var headers = exports.headers;
      headers['Content-Type'] = contentTypes[PATH.extname(asset)] || 'text/html';

      res.writeHead(200, headers);
      res.end(file);

    });
  });
};

exports.postHandler = function (res, req) { 
  // serve all files in that folder

  var body = [];
  var asset;
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = body.join('');
    asset = body.split('url=').join('');
  
    var filePath = archive.paths.list;

    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) {
        console.log('cannot find sites.txt');
        exports.returnWithStatusCode(res, 404);
      }
  
      console.log('found sites.txt');
      var str = file.toString();
      str = str.concat(asset + '\n');
      
      // write the file contents into a new file
      fs.writeFile(filePath, str, 'utf8', (err) => {
        if (err) {
          console.log('could not write site.txt');
        } 
        //on success respond with successful write!
        res.writeHead(302, exports.headers);
        res.end();
      });
    });
  });
};




  // if ( archive.isUrlInList(asset) ) {
  //   console.log('checking inside sites.txt');
  //   filePath = archive.archivedSites + asset;  
  // } else {
  //   //serve static files  
  //   filePath = documentRoot + asset;
  // }


// As you progress, keep thinking about what helper functions you can put here!
