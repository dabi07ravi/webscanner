var cron = require('node-cron');
let baseUrls = require("./src/base-urls");
const { performTask, generateUrls } = require('./src/utils.js');

cron.schedule('* * * * * *', () => {
  let gUrls = generateUrls(baseUrls);
  performTask(gUrls);
  console.log('running a task every minute', urls);
});


// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )