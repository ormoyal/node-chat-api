const moment = require('moment');


var date = moment();

console.log(date.valueOf());

console.log(new Date().getTime());

console.log(moment().add(10,'hour').format('h:mm a'));

moment();