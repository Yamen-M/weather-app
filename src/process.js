import applyWeatherTheme from "./theme";

const weatherContainer = document.getElementById("weather-container");
const locationName = document.getElementById("location-name");
const weatherDescription = document.getElementById("weather-description");
const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const uvIndex = document.getElementById("uv-index");
const forecastContainer = document.getElementById("forecast-container");
const alertContainer = document.getElementById("alert-container");

function fahrenheitToCelsius(f) {
  return Math.round(((f - 32) * 5) / 9);
}

export default function processdata(data) {
  applyWeatherTheme(data.currentConditions.conditions);

  locationName.textContent = data.resolvedAddress;
  weatherDescription.textContent = data.currentConditions.conditions;
  currentTemp.textContent = `${fahrenheitToCelsius(
    data.currentConditions.temp
  )}°C`;
  weatherIcon.textContent = getWeatherIcon(data.currentConditions.icon);
  feelsLike.textContent = `Feels like: ${fahrenheitToCelsius(
    data.currentConditions.feelslike
  )}°C`;
  humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
  windSpeed.textContent = `Wind: ${Math.round(
    data.currentConditions.windspeed
  )} mph`;
  uvIndex.textContent = `UV Index: ${data.currentConditions.uvindex}`;

  forecastContainer.innerHTML = "";
  data.days.slice(1, 5).forEach((day) => {
    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day slide-in-right";
    forecastDay.innerHTML = `
                <h3>${formatDay(day.datetime)}</h3>
                <span class="weather-icon emoji-icon">${getWeatherIcon(
                  day.icon
                )}</span>
                <div class="forecast-temp">
                    <span class="high-temp">${fahrenheitToCelsius(
                      day.tempmax
                    )}°</span>
                    <span class="low-temp">${fahrenheitToCelsius(
                      day.tempmin
                    )}°</span>
                </div>
                <p>💧 ${day.humidity}%</p>
                <p>🌬️ ${Math.round(day.windspeed)} mph</p>
            `;
    forecastContainer.appendChild(forecastDay);
  });

  alertContainer.innerHTML = "";
  if (data.alerts && data.alerts.length > 0) {
    const alertsHeader = document.createElement("h3");
    alertsHeader.textContent = "Weather Alerts";
    alertContainer.appendChild(alertsHeader);

    data.alerts.forEach((alert) => {
      const alertCard = document.createElement("div");
      alertCard.className = "alert-card";
      alertCard.innerHTML = `
                    <h4>${alert.event}</h4>
                    <p>${alert.description}</p>
                `;
      alertContainer.appendChild(alertCard);
    });
  }

  weatherContainer.classList.add("show");
}

function getWeatherIcon(icon) {
  const iconMap = {
    snow: "❄️",
    rain: "🌧️",
    fog: "🌫️",
    wind: "🌬️",
    cloudy: "☁️",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "☁️",
    "clear-day": "☀️",
    "clear-night": "🌙",
    "thunder-rain": "⛈️",
    "thunder-showers-day": "⛈️",
    "thunder-showers-night": "⛈️",
    "showers-day": "🌦️",
    "showers-night": "🌧️",
  };

  return iconMap[icon] || "☁️";
}

function formatDay(dateString) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return days[date.getDay()];
}
