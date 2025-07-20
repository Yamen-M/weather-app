import './style.css';

document.addEventListener('DOMContentLoaded', () => {

const weatherForm = document.getElementById('weather-form')
    const locationInput = document.getElementById('Location');

    async function getWeather(Location){
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${Location}?unitGroup=us&key=JG4PQMEAHUJ7HTRWAPAX3MMMZ&contentType=json`, 
                {
                    mode:'cors',
                    method: "GET"
                }
            );

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const weatherData = await response.json()
            processdata(weatherData);

        } catch (error) {
            console.error(error);
        }
    }

    function processdata(data){

        const weatherInfo = {
            location: data.resolvedAddress,
            description: data.description,
            timezone: data.timezone,
            current: {
                temp: data.currentConditions.temp,
                feelsLike: data.currentConditions.feelslike,
                humidity: data.currentConditions.humidity,
                windSpeed: data.currentConditions.windspeed,
                conditions: data.currentConditions.conditions,
                icon: data.currentConditions.icon,
                datetime: data.currentConditions.datetime,
                sunrise: data.currentConditions.sunrise,
                sunset: data.currentConditions.sunset
            },
            forecast: data.days.slice(0, 5).map(day => ({
                date: day.datetime,
                tempMax: day.tempmax,
                tempMin: day.tempmin,
                feelsLikeMax: day.feelslikemax,
                feelsLikeMin: day.feelslikemin,
                humidity: day.humidity,
                windSpeed: day.windspeed,
                precipProb: day.precipprob,
                uvIndex: day.uvindex,
                conditions: day.conditions,
                icon: day.icon,
                sunrise: day.sunrise,
                sunset: day.sunset
            })),
            alerts: data.alerts?.map(alert => ({
                event: alert.event,
                description: alert.description
            })) || []
        };
        
        applyWeatherTheme(data.currentConditions.conditions);

        console.log(weatherInfo);
    }

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = locationInput.value.trim();

        if (location) {
            getWeather(location);
        } else {
            alert("Please enter location!")
        }
    });

    function applyWeatherTheme(conditions) {
        const body = document.body;
        body.classList.remove('night-mode');

        // Clear previous weather classes
        body.className = '';

        // Apply theme based on conditions
        if (conditions.toLowerCase().includes('rain')) {
        body.style.setProperty('--primary-bg', 'var(--rainy-gradient)');
        } 
        else if (conditions.toLowerCase().includes('cloud')) {
        body.style.setProperty('--primary-bg', 'var(--cloudy-gradient)');
        }
        else if (conditions.toLowerCase().includes('clear') && isDaytime()) {
        body.style.setProperty('--primary-bg', 'var(--sunny-gradient)');
        }
        else if (conditions.toLowerCase().includes('clear') && !isDaytime()) {
        body.classList.add('night-mode');
        }
        else if (conditions.toLowerCase().includes('snow')) {
        body.style.setProperty('--primary-bg', 'var(--snow-gradient)');
        }
        else if (conditions.toLowerCase().includes('thunder')) {
            body.style.setProperty('--primary-bg', 'var(--thunder-gradient)');
        }
    }

    function isDaytime() {
        const hours = new Date().getHours();
        return hours > 6 && hours < 20;
    }

})

