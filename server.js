// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let { date } = { ...req.params };
  let re1 = /^\d+$/;
  let re3 = /^\s*$/;

  let result = { error: "Invalid Date" };

  if (re1.test(date)) {
    const epoch = parseInt(date, 10);
    const dt = new Date(epoch);
    result = { unix: dt.getTime(), utc: dt.toUTCString() };
  }

  if (new Date(date) != "Invalid Date") {
    const dt = new Date(date);
    result = { unix: dt.getTime(), utc: dt.toUTCString() };
  }

  if (!date || re3.test(date)) {
    const dt = new Date();
    result = { unix: dt.getTime(), utc: dt.toUTCString() };
  }

  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
