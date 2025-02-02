//****REQUIREMENTS****

// function for click event that searches using open weatherAPI
//     Note:(convert search input to proper case)
// function replaces the following id items when submit button is clicked:
//           * searching-city
//           * city-result
//           * current-date
//           * weekday
//           * month, day, year
//           * hour, min
//           * temperature, windspeed, humidity, description,icon
//*******************************************************************/

//api city update, weather, and search bar text when searching

let apiKey = "d7f1fbcd3e24octa40af721d34315a43";

function searchClick(event) {
  event.preventDefault();

  let cityInput = document.querySelector(".search-input").value;
  cityInput = toProperCase(cityInput);

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}`;

  updateSearchPlaceholder(cityInput);
  updateCity(cityInput);

  let citySearch = document.querySelector("#searching-city");
  citySearch.style.display = "block"; // toggles search message on

  axios
    .get(apiUrl)
    .then((response) => {
      weatherUpdate(response); // Updates weather data
      citySearch.style.display = "none"; // toggles the search message off
    })
    .catch((error) => {
      citySearch.style.display = "none"; // toggles error message on if error
      console.error("Error fetching data:", error);
    });
}

//convert search input to proper case
function toProperCase(str) {
  return str
    .split(" ") //
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

//update the placeholder text in the search bar

function updateSearchPlaceholder(cityInput) {
  let citySearch = document.querySelector("#searching-city");
  citySearch.innerHTML = `Searching weather for ${cityInput}`;
}

//update the city based on input
function updateCity(cityInput) {
  let searchQuery = document.querySelector("#city-result");
  searchQuery.innerHTML = `${cityInput}`;
}

//update the weather data
function weatherUpdate(response) {
  let weatherTemp = document.querySelector("#temperature");
  let weatherWindspeed = document.querySelector("#windspeed");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#description");
  let weatherIcon = document.querySelector("#icon");

  weatherTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  weatherWindspeed.innerHTML = `${response.data.wind.speed}`;
  weatherHumidity.innerHTML = `${response.data.humidity}`;
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png" alt="weather icon">`;
}

//event listener

let form = document.querySelector("#search-field");
form.addEventListener("submit", searchClick);

//date update and time

function updateDatTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let date = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  let updateWeekday = document.querySelector("#weekday");
  updateWeekday.innerHTML = `${day}`;

  let updateMonth = document.querySelector("#month");
  updateMonth.innerHTML = `${month}`;

  let updateDay = document.querySelector("#day");
  updateDay.innerHTML = `${date}`;

  let updateYear = document.querySelector("#year");
  updateYear.innerHTML = `${year}`;

  let updateHour = document.querySelector("#hour");
  updateHour.innerHTML = `${hour}`;

  let updateMin = document.querySelector("#min");
  updateMin.innerHTML = `${minutes}`;
}

updateDatTime();
