// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {

  let d = req.params.date
  let regexd = /^[0-9]*$/;
  let unix
  let date

  if (regexd.test(d)) {
    unix = new Date(+d);
    date = unix.toUTCString()
    d = parseInt(d)
    res.json({ unix: d, utc: date });
  } else if (d === null || d === 'undefined') {
    date = new Date()
    unix = date.getTime()
    res.json({ unix: unix, utc: date });
  } else {

    let object = new Date(d);

    if (isNaN(object)) {
      res.json({ error: "Invalid Date" });
    } else {
      d = new Date(d)
      d = d.getTime();
      unix = new Date(+d)
      date = unix.toUTCString()
      res.json({ unix: d, utc: date });
    }
  }
});

app.get("/api/", (req, res) => {
  date = new Date()
  unix = date.getTime()
  res.json({ unix: unix, utc: date });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
