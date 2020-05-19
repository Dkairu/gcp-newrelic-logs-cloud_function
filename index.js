  /**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
var request = require('request');

exports.logForwarder = (event, context) => {
 
 const pubsubMessage = event.data;
 const logMessage = Buffer.from(pubsubMessage, 'base64').toString();
 const license = process.env.INSIGHTS_API;

var headers = {
    'Content-Type': 'application/json',
    'Api-Key': license
};

var dataString = 
 {
    'message': logMessage,    
    'rawData': JSON.stringify(logMessage),
    'source': 'gcpStackdriverLogs'
  };

var options = {
    url: 'https://log-api.newrelic.com/log/v1',
    method: 'POST',
    headers: headers,
    body: dataString,
    json: true
};
request(options);
return;
};