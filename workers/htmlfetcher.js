var FS = require('fs');
var archive = require('../helpers/archive-helpers.js');
//var CronJob = require('cron').CronJob;
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting. 
var urlsToDownload = [];
//readListOfUrls
archive.readListOfUrls( (urlArray) => {
  urlArray.forEach( (url)=>{
    archive.isUrlArchived(url, (bool, url) =>{
      if (!bool) {
        console.log('right before push to urlsToDownload');
        // urlsToDownload.push(url);
        console.log('*** after push, before .downloadUrls');
        console.log(url);
        archive.downloadUrls([url]);
        // FS.writeFile(__dirname + '/crontest.txt', urlsToDownload.join(' '), (err) =>{
        //   if (err) { throw err; }
        // });
      }
    }); 
  });
});


// archive.downloadUrls(urlstoDownload);
  
  // for each URL in sites.txt
    // check if isUrlArchived
    //if NOT isUrlArchived
      // add to array of urls to download

  // run downloadUrls
