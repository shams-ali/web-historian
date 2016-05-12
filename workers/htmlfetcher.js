var FS = require('fs');
var archive = require('../helpers/archive-helpers.js');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting. 
var urlsToDownload = [];
//readListOfUrls
archive.readListOfUrls( (urlArray) => {
  urlArray.forEach( (url)=>{
    archive.isUrlArchived(url, (bool, url) =>{
      if (!bool) {
        console.log(url);
        archive.downloadUrls([url]);
      }
    }); 
  });
});
