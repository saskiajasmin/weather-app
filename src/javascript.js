// Date + Time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${date}/${month}/${year}, ${hours}:${minutes}`;
}

//Search Engine + Weather (API)
function showWeather(response) {
  let city = response.data.name;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = city;
  let displayDate = document.querySelector("#date");
  displayDate.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;
  feltCelsiusTemp = response.data.main.feels_like;

  let temperature = Math.round(celsiusTemperature);
  let displayTemp = document.querySelector("h1");
  displayTemp.innerHTML = `${temperature}°`;
  let feltTemp = Math.round(feltCelsiusTemp);
  let displayFeltTemp = document.querySelector("#felt-temp");
  displayFeltTemp.innerHTML = `${feltTemp}°C`;
  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let displayWind = document.querySelector("#wind-speed");
  displayWind.innerHTML = wind;
  let conditions = response.data.weather[0].main;
  let displayConditions = document.querySelector("#weather");
  displayConditions.innerHTML = conditions;
  let displayIcon = document.querySelector("#weather-icon");
  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayIcon.setAttribute("alt", response.data.weather[0].description);
}

let active = false;

function convertTemperature(event) {
  event.preventDefault();
  let conversionButton = document.querySelector("#convert-button");

  active = !active;
  if (active) {
    conversionButton.classList.add("active");
    conversionButton.innerHTML = `°C | <strong>°F</strong>`;
    displayFahrenheitTemp();
  } else {
    conversionButton.classList.remove("active");
    conversionButton.innerHTML = `<strong>°C</strong> | °F`;
    displayCelsiusTemp();
  }
}
function displayFahrenheitTemp() {
  let fahrenheitTemp = Math.round(celsiusTemperature * 1.8 + 32);
  let displayFahrenheitTemp = document.querySelector("h1");
  displayFahrenheitTemp.innerHTML = `${fahrenheitTemp}°`;

  let feltTempFahrenheit = Math.round(feltCelsiusTemp * 1.8 + 32);
  let displayFeltTempFahrenheit = document.querySelector("#felt-temp");
  displayFeltTempFahrenheit.innerHTML = `${feltTempFahrenheit}°F`;
}

function displayCelsiusTemp() {
  let displayTemp = document.querySelector("h1");
  displayTemp.innerHTML = `${Math.round(celsiusTemperature)}°`;

  let displayFeltTemp = document.querySelector("#felt-temp");
  displayFeltTemp.innerHTML = `${Math.round(feltCelsiusTemp)}°C`;
}

let button = document.querySelector("#convert-button");
button.addEventListener("click", convertTemperature);

let celsiusTemperature = null;
let feltCelsiusTemp = null;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let searchbar = document.querySelector("#searchbar");
searchbar.addEventListener("submit", searchCity);

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  function retrievePosition(position) {
    let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
}

document.addEventListener("DOMContentLoaded", getLocation);
