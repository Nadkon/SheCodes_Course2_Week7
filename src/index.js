function displayTemperature(response){
    // console.log(response.data.main.temp);
    let currentTemperature = document.querySelector("#current-temp");
    currentTemperature.innerHTML = Math.round(response.data.main.temp);
}
let apiKey = "3324937c27278e13f542f63f7e3df9b5";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);