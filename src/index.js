// Show current temperature
function displayTemperature(response){
    let currentTemperature = document.querySelector("#current-temp");
    let city = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    currentTemperature.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "3324937c27278e13f542f63f7e3df9b5";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayTemperature);

// Show current date and time
let now = new Date();
let days = ["Sunday", "Monday", "Tuesdya", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekDay = document.querySelector("#week-day");
weekDay.innerHTML = days[now.getDay()];

let hourElement = document.querySelector("#hour");
let hour =  now.getHours();
    if (hour < 10){
        hour = `0${hour}`
    };
hourElement.innerHTML = hour;
let minuteElement = document.querySelector("#minutes");
let minute = now.getMinutes();
    if (minute < 10){
        minute = `0${minute}`
    };
minuteElement.innerHTML = minute;

