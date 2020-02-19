//App Dependencies:
const express = require('express');

//"require" parses JSON into array/object
const geoData = require('./data/geo.json');
const darkSkyData = require('./data/darksky.json');

//App Setup:

// create Express App
const app = express();
// set the port where the server will run
const port = 3000;
//enable middleware

//Set API Routes:
  //route skeleton/abstract
    // app.<http method>(<path>, (handler, handler));


app.get('/location', (req, res) => {
    try {
        const location = req.query.location;
        const result = getLatLng(location);
        res.status(200).json(result);     
    }
    catch (err) {
        res.status(500).send('Failed attempt. Please try again.');
    }
});

//Helper Functions
let getLatLng = (location) => {
    if(location === 'bad location') {
        throw new Error();
    }
    //ignore location for now, return hard-coded file?
    //api call goes here:

    //convert to desired data format:
    return toLocation(geoData);
};

let toLocation = (dataRoute) => {
    const firstResult = dataRoute.results[0];
    const geomety = firstResult.geometry;
};

// THIS IS DARKSKY

app.get('/weather', (req, res) => {
  try {
      const weather = req.query.weather;
      const result = getForecast(weather);
      res.status(200).json(result);     
  }
  catch (err) {
      res.status(500).send('Failed attempt. Please try again.');
  }
});

let getForecast = (weather) => {
  if(weather === 'bad weather') {
    throw new Error();
}
//ignore location for now, return hard-coded file?
//api call goes here:

//convert to desired data format:
return toLocation(darkSkyData);
};
}

let toAbc = (route) => {
  for darkSkyData;
}

//this listens in on ?
app.listen(3000, () => {
    console.log('idk');
});

//this is some universal response
app.get('*', (req, res) => res.send('404'));

module.exports = {
    app,
    toLocation,
    getLatLng
};
