const express = require('express');
const request = require('superagent');
const cors = require('cors');
const app = express();


app.use(cors());

let lng;
let lat;

app.get('/location', async(req, res, next) => {
    try { 
        const location = req.query.search;
        const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${location}&format=json`;
        const cityData = await request.get(URL);
        const firstResult = cityData.body[0];
        
        lat = firstResult.lat,
        lng = firstResult.lon,

        res.json({
            formatted_query: firstResult.display_name,
            latitude: lat,
            longitude: lng
        });
    } catch (err) {
        next(err);
    }   
});

let getWeatherData = async(lat, lng) => {
    const weather = await request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${lng}`);
    return weather.body.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),
        };
    });
};

app.get('/weather', async(req, res, next) => {
    try {
        let portlandWeather = await getWeatherData(lat, lng);
        res.json(portlandWeather); 
    } catch (err) {
        next(err);
    }
});

app.get('*', (req, res) => res.send('404'));

module.exports = {
    app: app,
};