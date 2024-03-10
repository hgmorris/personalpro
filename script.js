
const WeatherApp = {
    apiKey: 'a4cd6ee4e32c49a4a0730214241003e3', 

    getWeatherData: async function(location) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error;
        }
    },

    updateUI: function(data) {
        const weatherDataElement = document.getElementById('weather-data');

        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            weatherDataElement.innerHTML = 'Please enter a valid location';
            return;
        }

        const temperatureInCelsius = Math.floor(data.main.temp - 273.15);
        const backgroundColor = this.getBackground(temperatureInCelsius);
        weatherDataElement.style.background = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${temperatureInCelsius}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed}m/s</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    },

    getBackground: function(temperature) {
        if (temperature > 30) {
            return 'lightcoral';
        } else if (temperature > 20) {
            return 'lightyellow';
        } else if (temperature > 10) {
            return 'lightgreen';
        } else if (temperature > 0) {
            return 'lightblue';
        } else {
            return 'lightskyblue'; 
        }
    }
};

document.getElementById("location-input").addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const location = e.target.value;
        console.log("Location:", location);

        try {
            const weatherData = await WeatherApp.getWeatherData(location);
            WeatherApp.updateUI(weatherData);
        } catch (error) {
            console.error("Error:", error);
        }
    }
});


