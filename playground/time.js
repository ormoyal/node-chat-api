const moment = require('moment');


var date = moment(1523205942559);
// time: 'Sun Apr 08 2018 19:46:37 GMT+0300 (Jerusalem Daylight Time)',
console.log(date);

console.log(new Date().getTime());

console.log(moment().add(10,'hour').format('h:mm a'));

moment();