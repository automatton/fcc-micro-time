// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.route('/:data')
  .get(function(req, res) {
	  let data = req.params.data;
	  let response = {};
	  let date;
	
	  if (/^\d+$/.test(data)) data = +data //if all digits, convert to number
	  try {
	    date = new Date(data);
	    console.log("Date: " + date.getTime());
    } catch (err) {
      console.log(err);
    }
  
    if (date.getTime()) {
      response.Unix = date.valueOf();
      response.Natural = date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      response.Unix = null;
      response.Natural = null;
    }
    res.status(200).send(response);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
