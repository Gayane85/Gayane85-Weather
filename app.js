const apiKey = "f8cc68eaf3211a5c23fc6682a93e5a26";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

//let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

let searchInputCity = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function getWeather(city) {
  const response = await fetch(WEATHER_URL + `${city}` + `&appid=${apiKey}`);
  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data, "data");

    document.querySelector(".city").innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "&deg;C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "fa-solid fa-cloud-raine";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "fa-solid fa-cloud-mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
    }
    weather.style.display = "block";
    error.style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  getWeather(searchInputCity.value);
  searchInputCity.value = "";
});

searchInputCity.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    getWeather(searchInputCity.value);
    searchInputCity.value = "";
  }
});
