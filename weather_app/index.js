//setting date to current date and time
function dateChange(event){
  event.preventDefault();
  
  let currentDate = new Date();
  // currentDate.getDate();
  // currentDate.getTime();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day= days[currentDate.getDay()]
  // console.log(`${day} ${currentDate.getDate()},${currentDate.getTime()}`);

  let myDate = document.querySelector("#my-date");
  myDate.innerHTML = `${day} ${currentDate.getHours()}:${currentDate.getMinutes()}`
}
let theDate = document.querySelector("#my-form");
theDate.addEventListener('submit', dateChange);


// displays the data from the api
function displayWeatherDetails(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#my-city");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#description");

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  weatherDescription.innerHTML = response.data.weather[0].description;
}

// capturing the data entered using the weather api and calling the display weather function
function cityChange(city) {
  let apiKey = "944a0ebf0a05fb921482f383b9c4e4b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherDetails);
}

// searches the form and handles submission
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  cityChange(city);
}

// searches for the location to return the latitudes and longitudes
function searchLocation(position) {
  let apiKey = "944a0ebf0a05fb921482f383b9c4e4b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${position.coords.latitude}&lon=${position.coords.longitude}&${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

// uses the geoloaction api to return the current location of the user
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let theCity = document.querySelector("#my-form");
theCity.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#myButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

cityChange("Kampala");



