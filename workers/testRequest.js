var request = require('request');

var parseHtml = function(html) {
  console.log(html);
};
 
request('https://www.google.com/', function(err, res, body) {
  if (err) {
    throw err;
  }

  parseHtml(body);
});