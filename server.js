const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { exec } = require('child_process');
const app = express();

// Set up middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define an array to hold the data from each federated source
let federatedData = [];

// Route to receive data from a federated source
app.post('/federate', (req, res) => {
  const newData = req.body;

  // Add the new data to the federatedData array
  federatedData.push(newData);

  res.status(200).send('Data received');
});

// Route to retrieve all federated data
app.get('/federate', (req, res) => {
  res.json(federatedData);
});

// Schedule a task to run every day at midnight
cron.schedule('0 0 * * *', () => {
  // Run a command using child_process.exec
  exec('your-command-here', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
