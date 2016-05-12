var FS = require('fs');
var PATH = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: PATH.join(__dirname, '../web/public'),
  archivedSites: PATH.join(__dirname, '../archives/sites'),
  list: PATH.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  FS.readFile( exports.paths.list, (err, file) => {
    if (err) {
      console.log('cannot find sites.txt');
      // throw(err);
      exports.returnWithStatusCode(res, 404);
    } else {
      console.log('found sites.txt');
      var str = file.toString().split('\n');
      console.log(str, 'this is str');
      cb(str);
    }
  });
};

exports.isUrlInList = function(url, cb) {
  FS.readFile( exports.paths.list, (err, file) => {
    if (err) {
      console.log('cannot find sites.txt');
      // throw(err);
      exports.returnWithStatusCode(res, 404);
    } else {
      console.log('found sites.txt');
      var str = file.toString().split('\n');
      str.indexOf(url) > -1 ? cb(true) : cb(false);
    }
  });
};

exports.addUrlToList = function(url, cb) {
  FS.readFile( exports.paths.list, (err, file) => {
    if (err) {
      console.log('cannot find sites.txt');
      // throw(err);
      exports.returnWithStatusCode(res, 404);
    } else {
      console.log('found sites.txt');
      var str = file.toString().split('\n');
      str.push(url);
      str = str.join('\n');
      FS.writeFile( exports.paths.list, str, 'utf8', (err) => {
        if (err) {
          console.log('Cannot write url to sites.txt');
        }
        cb();
      });
    }
  });
};

exports.isUrlArchived = function(url, cb) {
  var dirPath = exports.paths.archivedSites + '/' + url;
  FS.readdir( dirPath, (err, files) => {
    if (err) {
      console.log('cannot find director of /' + url);
      cb(false);
    } else {
      console.log('found dir of /' + url);
      _.map(files, cb);
      
    }
  });
};

exports.downloadUrls = function(urlArray) {
  //get an array of our current list
  //check the paramateres to see if it is in our list
    //if in the list do nothing
    //if not in the list create the directory
  _.each(urlArray, function(url) {
    exports.isUrlInList(url, function(bool) {
      if (bool) {
        return;
      } else {
        FS.mkdir(exports.paths.archivedSites + '/' + url, (err, folder) => {
          if (err) {
            console.log('cannot make dir of /' + url);
          }
        });    
      }
    });
  });
  //get request from url
  //check isURLinlist
  //store in JSON object
};








