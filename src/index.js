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
// forecast
function displayForecast() {
    let forecastElement = document.querySelector("#forecast")

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `
        <div class="col-2 forecast-info">
        <div class="forecast-date">${day}</div>
        <img src="./src/rain.png" alt="rain">
        <div class="forecast-temperature">
        <span class="forecast-temperature-max">12°</span>
        <span class="forecast-temperature-min">10°</span>
        </div>
        </div>`;
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
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

// conversion from C to F
function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let currentTemperature = document.querySelector("#current-temp");
    currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temp");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

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
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocation = document.querySelector("#current-location-search");
currentLocation.addEventListener("click", showCurrentLocation);

search("Kyiv");
displayForecast();