const rp = require('request-promise');

module.exports = {
  callFn(serviceEnv, data, jsonBack) {
    const serviceHostEnv = process.env[`${serviceEnv}_SERVICE_HOST`];
    const servicePortEnv = process.env[`${serviceEnv}_SERVICE_PORT`];
    const options = {
      uri: `http://${serviceHostEnv}:${servicePortEnv}/`,
      method: 'POST',
      body: data,
      json: jsonBack, // Automatically parses the JSON string in the response
    };
    console.log(options);
    return rp(options);
  },
};
