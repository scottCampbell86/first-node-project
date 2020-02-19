const express = require('express');
const app = express();
//const request = require('request');
const geoData = require('./data/geo.js');
const weather = require('./data/darksky.js');
const cors = require('cors');

app.use(cors());

//initialize state variables
let lng;
let lat;

app.get('/location/', (request, response) => {
    //const location = request.query.search;
    const cityData = geoData.results[0];
    lat = cityData.geometry.location.lat,
    lng = cityData.geometry.location.lng,
    response.json({
        
        name: request.query.name,
        formatted_query: cityData.formatted_address,
        //in 23 and 24 we set state
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng
    });
});

//eventually this will be replaced by an API call
    // will need lat/lon though
let getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000)
        };
    });
};

app.get('/weather', (request, response) => {
    let portlandWeather = getWeatherData(lat, lng);
    response.json(portlandWeather);
});
//app.listen(3000, () => { console.log('running . . .')});

app.get('*', (request, response ) => {
    request.send({
        uhOh: '404'
    });
});

module.exports = {
    app: app,
};