let inputName = prompt(`What is your name?`);
document.querySelector("#new-user-city").innerHTML = `Welcome ${inputName}`;

//Get Data for Day, Date and Time

let latestData = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[latestData.getDay()];

let updateDay = document.querySelector("#currentDay");
updateDay.innerHTML = `${day}`;

let hour = latestData.getHours();
if (hour < 10) {
  hours = `0${hours}`;
}
let minutes = latestData.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let updateTime = document.querySelector("#currentTime");
updateTime.innerHTML = `${hour}:${minutes}h`;

// Get Current Location to reflect Temperature
function updateDetails(response) {
  document.querySelector("#show-temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
  // Get Current Location to reflect City
  document.querySelector("#new-user-city").innerHTML = response.data.name;

  // Get Current Location to reflect Weather description

  document.querySelector("#weatherType").innerHTML =
    response.data.weather[0].main;

  // Update humdity and wind

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
}

//Get user input of city/country to reflect on app

function searchCity(event) {
  event.preventDefault();
  let userInput = document.querySelector(`#input-user-city`);
  let cityOutput = document.querySelector(`#new-user-city`);
  cityOutput.innerHTML = `${userInput.value}`;

  let apiKey = `f34dd80fa35cdc2d0ed6f98ed24a4a66`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateDetails);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", searchCity);

//Get coordinates for Current Button

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `f34dd80fa35cdc2d0ed6f98ed24a4a66`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateDetails);
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let getCurrent = document.querySelector("#getCurrentLocation");
getCurrent.addEventListener("click", getCoordinates);
