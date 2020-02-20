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

const getWeatherData = async(lat, lng) => {
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
const getEventData = async(lat, lng) => {
    const URL = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_KEY}&where=${lat},${lng}&within=25&page_size=20&page_number=1`;
    const eventData = await request.get(URL);
    const nearbyEvents = JSON.parse(eventData.text);

    return nearbyEvents.events.event.map(event => {
        return {
            link: event.url,
            name: event.title,
            event_date: event.start_time,
            summary: event.description,
        };
    });
};
app.get('/event', async(req, res, next) => {
    try {
        let userEvent = await getEventData(lat, lng);
        res.json(userEvent); 
    } catch (err) {
        next(err);
    }
});

const getHikingData = async(lat, lng) => { 
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${process.env.HIKING_KEY}`;
    const hikeData = await request.get(URL);
    const nearbyHikes = hikeData.body.trails;

    return nearbyHikes.map(hike => {
        return {
            name: hike.name,
            location: hike.location,
            length: hike.length,
            stars: hike.stars,
            star_votes: hike.star_votes,
            summary: hike.summary,
            trail_url: hike.url,
            conditionDetails: hike.conditionDetails,
            condition_date: new Date(nearbyHikes.time * 1000),
            condition_time: new Date(nearbyHikes.time * 1000)
        };
    });
};
app.get('/trails', async(req, res, next) => {
    try {
        const userHike = await getHikingData(lat, lng);
        res.json(userHike);
    } catch (err) {
        next(err);
    }
});

/// YELP
const getYelpData = async(lat, lng) => {
    const yelpData = await request
        .get(`https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lng}`)
        .set('Authorization', `Bearer ${process.env.YELP_KEY}`);
    const nearbyYelpOptions = yelpData.body.businesses;

    return nearbyYelpOptions.map(business => {
        return {
            name: business.name,
            image_url: business.image_url,
            price: '${business.price}',
            rating: business.rating,
            url: business.url
        };
    });
};

app.get('/yelp', async(req, res, next) => {
    try {
        console.log('hi');
        const userYelp = await getYelpData(lat, lng);
        
        res.json(userYelp);
    } catch (err) {
        next(err);
    }
});

app.get('*', (req, res) => res.send('404'));

module.exports = {
    app: app,
};