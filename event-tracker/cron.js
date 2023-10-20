var cron = require('node-cron');
const { scrapEventData } = require('./services/event.service');

// cron.schedule('* * * * * *', () => {
//   scrapEventData();
//   console.log('running a task every second', urls);
// });

// (async () => {
//   console.log("we are inside cron file");
//   let logd = await scrapEventData();
//   console.log(logd);
// })();


// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )