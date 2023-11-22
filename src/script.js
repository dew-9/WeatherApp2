function refreshWeather(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let percipitationElement = document.querySelector("#percipitation");
  console.log(response.data);
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weatherIcon");
  cityElement.innerHTML = response.data.city;
  currentTemp.innerHTML = `${Math.round(temperature)}℃`;
  descriptionElement.innerHTML = response.data.condition.description;
  percipitationElement.innerHTML = `Percipitation: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  weatherIcon.innerHTML = `<img
            src="${response.data.condition.icon_url}"
            alt="Weather Icon"
            class="current-temp";
            width = "40";>`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "6o808f4d3ta99b430e5547b006a7c43c";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "6o808f4d3ta99b430e5547b006a7c43c";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast">
        <div class="row">
          <div class="col-2">
            <span class="forecast-date">${formatDay(day.time)}</span>
            <br />
            <img
              src="${day.condition.icon_url}"
              alt="weather icon"
              class="weather-icon"
              width="35px"
            />
            <span class="forecast-temp">${Math.round(
              day.temperature.day
            )}℃</span>
          </div>
        </div>
      </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

searchCity("Hamilton");
getForecast("Hamilton");
