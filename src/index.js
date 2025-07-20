import "./style.css";
import processdata from "./process";
import { showLoading, hideLoading } from "./loading";

document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.getElementById("weather-form");
  const locationInput = document.getElementById("Location");

  async function getWeather(Location) {
    try {
      showLoading();
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${Location}?unitGroup=us&key=JG4PQMEAHUJ7HTRWAPAX3MMMZ&contentType=json`,
        {
          mode: "cors",
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const weatherData = await response.json();
      processdata(weatherData);
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  }

  const submitButton = document.querySelector("#weather-form button");
  submitButton.innerHTML = '<i class="fas fa-search-location"></i> ';

  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = locationInput.value.trim();

    if (location) {
      getWeather(location);
    } else {
      alert("Please enter location!");
    }
  });
});
