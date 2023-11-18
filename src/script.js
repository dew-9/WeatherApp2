function refreshWeather(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(temperature);
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

searchCity("Hamilton");
