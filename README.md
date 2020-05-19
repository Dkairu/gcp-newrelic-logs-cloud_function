GCP function to forward Stackdriver logs to New Relic


The steps for this installation include

- Creating a cloud function that will be triggered by Pub/Sub when new logs are written.
- Creating a sink in Stackdriver that will route logs to the Pub/Sub Topic created.
- Viewing your logs in New Relic.
      
**1. Create a cloud function**

Go to the cloud functions page and create a new function make sure to select Cloud Pub/Sub as a trigger
![alt text](https://github.com/Dkairu/gcp-newrelic-logs-cloud_function/blob/master/screenshots/screenshot5.png)
 

On topic selection create a topic
![alt text](https://github.com/Dkairu/gcp-newrelic-logs-cloud_function/blob/master/screenshots/screenshot6.png)

Add the inline code in the editor and use Node.js 8, make sure you have the same function name as the one you are exporting
![alt text](https://github.com/Dkairu/gcp-newrelic-logs-cloud_function/blob/master/screenshots/screenshot4.png)

Click on the environment variables dropdown and enter the insights insert key with as INSIGHTS_API and click on create
![alt text](https://github.com/Dkairu/gcp-newrelic-logs-cloud_function/blob/master/screenshots/screenshot3.png)


**2. Create a sink in Stackdriver**

In Stackdriver logging page create a filter for the logs that you want to export, then create a sink with pub/sub as the sink service.  On the sink destination select a topic you created from cloud function.
![alt text](https://github.com/Dkairu/gcp-newrelic-logs-cloud_function/blob/master/screenshots/screenshot1.png)


**3. View your logs**

That's it! In the code above I am sending the JSON as a string and it is stored under rawData so you can easily search within the logs. You also have the parsed logs available for filtering.
![alt text](https://github.com/Dkairu/gcp-newrelic-logs-cloud_function/blob/master/screenshots/screenshot2.png)
