const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
const API_KEY = 'f63a2f699677ed84c7ca4d8b2a8bba81'; 

app.use(cors());

// Array to hold previously searched cities
let searchedCities = [];

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = response.data;

        // Save the city to the previously searched cities list (if not already saved)
        if (!searchedCities.includes(city)) {
            searchedCities.push(city);
        }

        res.json({
            city: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            previousSearches: searchedCities, // Return the list of previously searched cities
        });
    } catch (error) {
        res.status(404).json({ error: 'City not found' });
    }
});

// Endpoint to retrieve previously searched cities
app.get('/previous-searches', (req, res) => {
    res.json({ previousSearches: searchedCities });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
