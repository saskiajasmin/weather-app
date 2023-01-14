//Date + Time
let now = new Date();

let currentDay = document.querySelector("li#day");

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

currentDay.innerHTML = `${day},`;

let currentDate = document.querySelector("li#full-date");

let date = now.getDate();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${month} ${date},`;

let currentTime = document.querySelector("li#time");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${hours}:${minutes}`;

//Search Engine (API)
function showWeather(response) {
  let city = response.data.name;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = `📍${city}`;
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("h1");
  displayTemp.innerHTML = `${temperature}°`;
  let feltTemp = Math.round(response.data.main.feels_like);
  let displayFeltTemp = document.querySelector("#felt-temp");
  displayFeltTemp.innerHTML = `${feltTemp}°C`;
  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed * (18 / 5));
  let displayWind = document.querySelector("#wind-speed");
  displayWind.innerHTML = wind;
  let conditions = response.data.weather[0].main;
  let displayConditions = document.querySelector("#weather");
  displayConditions.innerHTML = conditions;
}

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

let button = document.querySelector("#current-location");
button.addEventListener("click", getLocation);
