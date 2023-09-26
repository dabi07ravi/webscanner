var cron = require('node-cron');
const { chkEventData } = require('./services/change_event.service');

// cron.schedule('* * * * * *', () => {
//   chkEventData();
//   console.log('running a task every second', urls);
// });

(async () => {
  console.log("we are inside cron file");
  let logd = await chkEventData();
  console.log(logd);
})();


// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )