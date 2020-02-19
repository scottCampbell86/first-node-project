const express = require('express');
const app = express();
const request = require('superagent');
const darkSkyData = require('./data/darksky.json');
const geoData = require('./data/geo.json');
const weather = require('./data/darksky.js');

// const geoParse = geoData[0];
// console.log(geoData[0].display_name);
app.get('/location/', (req, res) => {
    const cityData = geoData.results[0];
    console.log(req.query);
    res.json({
        name: req.query.name,
        formatted_query: cityData.formatted_address,
        lat: cityData.geometry.location.lat,
        lon: cityData.geometry.location.lon
    });
});

//?search=Portland
// app.get('/location/search-query/', (req, res) => {
//     res.json({
//         search_query: 'whatever',
//         formatted_query: 'other-thing',
//         location_name: geoParse.display_name,
//         lat: geoParse.lat,
//         lon: geoParse.lon
//     });
// });

//user will pass a search query param called 'portland' you need to match that to lat and lon

// console.log(darkSkyData.currently.summary);

app.get('/weather/:lat/:lon/', (req, res) => {
    res.json([
        {
            lat: darkSkyData.latitude,
            lon: darkSkyData.longitude,
            forecast: darkSkyData.currently.summary,
            time: dateString
        }
    ]);
});

//eventually this will be replaced by an API call
    // will need lat/lon though
let getWeatherData = (lat, lon) => {
  return weather.daily.data.map(forecast => {
  return 
        {
          forecast: forecast.summary,
          time: new Date(forecast.time);
    }
  })
}

app.get('/weather', (req, res) => {
    const portlandWeather = getWeatherData(/*lat*/*lon);
  
})

// let theDate = new Date(darkSkyData.currently.time * 1000);
// let dateString = theDate.toUTCString();
// // console.log(dateString);

app.get('*', (req, res) => {
    res.send({
        uhOh: '404'
    });
});

app.listen(3000, () => { console.log('running . . .')});

module.exports = {
    app: app,
};