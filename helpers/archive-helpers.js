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

exports.readListOfUrls = function() {
  FS.readFile( exports.paths.list, (err, file) => {
    if (err) {
      console.log('cannot find sites.txt');
      // throw(err);
      exports.returnWithStatusCode(res, 404);
    } else {
      console.log('found sites.txt');
      var str = file.toString();
      console.log(str, 'this is string');
      return str;
    }
  });
};

exports.isUrlInList = function(url) {
  var urlList = exports.readListOfUrls();
  console.log(urlList, 'this is URLLIST');
  return urlList.indexOf(url) > -1 ? true : false;
};

exports.addUrlToList = function(url) {
  var urlList = exports.readListOfUrls();

  urlList[url] = url;
};

exports.isUrlArchived = function(url) {
  //check if archives/sites contains files for url
  //if so, return files
  //if not return false
};

exports.downloadUrls = function(url) {
  //get request from url
  //check isURLinlist
  //store in JSON object
};
