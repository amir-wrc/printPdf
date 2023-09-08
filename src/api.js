const express = require("express");
const serverless = require("serverless-http");
const ptp = require("pdf-to-printer");
// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  ptp
  .getPrinters()
  .then(result=>{
    console.log(result);
    res.json(result)
  })
  .catch(console.error);
  
});

router.get("/defaultPrint", (req, res) => {
  ptp
  .getDefaultPrinter()
  .then(result=>{
    console.log(result);
    res.json(result)
  })
  .catch(console.error);
  
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);