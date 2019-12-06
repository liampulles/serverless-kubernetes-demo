const callUtil = require('./lib/call-fn');

module.exports = {
  chain(event, context) {
    return callUtil.callFn('PIG_LATINIZE', event.data, false)
      .then((res) => callUtil.callFn('BOX', res, false));
  },
};
