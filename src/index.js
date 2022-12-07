// Sohw current date and time (version 2)
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

// Show current temperature
function displayTemperature(response){
    console.log(response.data);
    let currentTemperature = document.querySelector("#current-temp");
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    currentTemperature.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = FormatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
let apiKey = "3324937c27278e13f542f63f7e3df9b5";
let unit = "metric";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayTemperature);

// Show current date and time (version 1)
// let now = new Date();
// let days = ["Sunday", "Monday", "Tuesdya", "Wednesday", "Thursday", "Friday", "Saturday"];
// let weekDay = document.querySelector("#week-day");
// weekDay.innerHTML = days[now.getDay()];

// let hourElement = document.querySelector("#hour");
// let hour =  now.getHours();
//     if (hour < 10){
//         hour = `0${hour}`
//     };
// hourElement.innerHTML = hour;
// let minuteElement = document.querySelector("#minutes");
// let minute = now.getMinutes();
//     if (minute < 10){
//         minute = `0${minute}`
//     };
// minuteElement.innerHTML = minute;

