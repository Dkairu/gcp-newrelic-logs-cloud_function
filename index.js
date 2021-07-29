/**
* Triggered from a message on a Cloud Pub/Sub topic.
*
* @param {!Object} event Event payload.
* @param {!Object} context Metadata for the event.
*/
var request = require('request');

exports.logForwarder = (event, context) => {

  const pubSubMessage = JSON.parse(Buffer.from(event.data, 'base64').toString());
  const logMessage = '[' + JSON.stringify(pubSubMessage) + ']'
  pubSubMessage.message = logMessage
  const license = process.env.INSIGHTS_API;

  var headers = {
    'Content-Type': 'application/json',
    'Api-Key': license
  };

  var dataString =
  {
    'message': JSON.stringify(pubSubMessage),
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