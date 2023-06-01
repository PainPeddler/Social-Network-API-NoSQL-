const dayjs = require('dayjs');

module.exports = (inputTime) => {
  const formattedTime = dayjs(inputTime).format('MMM DD, YYYY [at] hh:mm a');
  return formattedTime;
};