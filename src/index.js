// Sohw current date and time
function FormatDate(timestamp){
    let date = new Date (timestamp);
    let hours = date.getHours();
        if (hours < 10){
            hours = `0${hours}`;
        }
    let minutes = date.getMinutes();
        if (minutes < 10){
            minutes = `0${minutes}`;
        }
    let days = ["Sunday", "Monday", "Tuesdya", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}
// forecast
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast")

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML + `
        <div class="col-2 forecast-info">
        <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="rain">
        <div class="forecast-temperature">
        <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>`;
        }
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
// show forecast
function getForecast(coordinates) {
    // let apiKey = "3324937c27278e13f542f63f7e3df9b5";
    let apiKey = "6f578b96aa9505bcce148ac22cb85794";
    // API key to use!!! 6f578b96aa9505bcce148ac22cb85794
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=-${coordinates.lon}&units=metric&appid=${apiKey}`;
    // let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}
// Show current temperature
function displayTemperature(response){
    let currentTemperature = document.querySelector("#current-temp");
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = response.data.main.temp;
    currentTemperature.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = FormatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord)
}

function search(city){
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);



function searchPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}

function showCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
}
let apiKey = "3324937c27278e13f542f63f7e3df9b5";

let currentLocation = document.querySelector("#current-location-search");
currentLocation.addEventListener("click", showCurrentLocation);

search("Kyiv");
