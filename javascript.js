//****REQUIREMENTS****

// function for click event that searches using tomorrow.io weather API
//     Note:
//           * convert search input to proper case
//           * API requires lat and long so need geocoord api to convert cities to geocoord
//           * tomorrow.io api does not have icons so need to map weather codes to custom icons
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
let apiKey = "xXKqIdDpT0sRO3yOXcGtg5tFS8C7NQZ7";
let opencageKey = "0a28c32f1a4b40bbb4d8399ee9f42111";

//function to search to trigger event
function searchClick(event) {
  event.preventDefault();

  let cityInput = document.querySelector(".search-input").value;
  cityInput = toProperCase(cityInput);

  // Get coordinates for the city
  getCoordinates(cityInput).then((coordinates) => {
    if (!coordinates || !validateCoordinates(coordinates)) {
      // If coordinates are null, city is invalid
      alert("Location shrouded in darkness. No weather information available.");
      return;
    }

    // Get weather data using coordinates
    const { lat, lng } = coordinates;
    const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lng}&apikey=${apiKey}&fields=temperature,weatherCode,humidity,precipitation,weatherIcon,windspeed`;

    updateSearchPlaceholder(cityInput);
    updateCity(cityInput);

    let citySearch = document.querySelector("#searching-city");
    citySearch.style.display = "block"; // toggles search message on

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data); // Log the response to inspect the API structure
        weatherUpdate(response); // Updates weather data
        citySearch.style.display = "none"; // toggles the search message off
      })
      .catch((error) => {
        citySearch.style.display = "none"; // toggles error message on if error
        console.error("Error fetching data:", error);
      });
  });
}

// Coordinate validation
function validateCoordinates(coordinates) {
  const { lat, lng } = coordinates;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    console.warn("invalid coordinates:", coordinates);
    return false;
  }
}

// Get coordinates for the city
function getCoordinates(cityInput) {
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityInput}&key=${opencageKey}`;

  return axios
    .get(geocodeUrl)
    .then((response) => {
      const data = response.data.results[0];

      // Check for valid data
      if (!data || data.length === 0) {
        console.warn("No city results.");
        return null; // Return null if no valid city data is found
      }

      const lat = data.geometry.lat;
      const lng = data.geometry.lng;
      return { lat, lng };
    })
    .catch((error) => {
      console.error("Error with coordinates:", error);
      return null;
    });
}

// Convert search input to proper case
function toProperCase(str) {
  return str
    .split(" ") // Split by spaces
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

// Update the placeholder text in the search bar
function updateSearchPlaceholder(cityInput) {
  let citySearch = document.querySelector("#searching-city");
  citySearch.innerHTML = `Searching weather for ${cityInput}`;
}

// Update the city based on input
function updateCity(cityInput) {
  let searchQuery = document.querySelector("#city-result");
  searchQuery.innerHTML = `${cityInput}`;
}
// Update the weather data
function weatherUpdate(response) {
  console.log("API Response:", response.data); // logs API structure

  let weatherTemp = document.querySelector("#temperature");
  let weatherWindspeed = document.querySelector("#windspeed");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#description");
  let weatherIcon = document.querySelector("#icon");

  if (response.data && response.data.data && response.data.data.values) {
    let values = response.data.data.values;
    console.log("Weather values:", values); //logs weather values

    // Checks if weatherCode exists in the response
    console.log("Weather code:", values.weatherCode);

    // Update the HTML with the weather information
    weatherTemp.innerHTML = `${Math.round(values.temperature)}°C`;
    weatherWindspeed.innerHTML = `${values.windSpeed}`;
    weatherHumidity.innerHTML = `${values.humidity}`;

    //gets weather code description from weathercodes file
    function getDescription(code) {
      if (!code) {
        console.warn("Weather code is missing or invalid.");
        return "One does not simply know the forecast!";
      }
      return weatherCodes.weatherCode[code] || "No data available";
    }

    //updates weather description
    weatherDescription.innerHTML = getDescription(values.weatherCode);

    //maps weather icon to weather code
    const iconUrl = weatherIcons[values.weatherCode] || weatherIcons[0];

    //updates weather icon
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="weather icon" />`;
  } else {
    console.error("Invalid or missing data in response", response);
  }
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
