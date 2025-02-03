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

// api city update, weather, and search bar text when searching
let apiKey = "xXKqIdDpT0sRO3yOXcGtg5tFS8C7NQZ7";
let opencageKey = "0a28c32f1a4b40bbb4d8399ee9f42111";

// Convert search input to proper case
function toProperCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Function to search and trigger event
function searchClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input").value;
  cityInput = toProperCase(cityInput);

  // Get coordinates for the city
  getCoordinates(cityInput).then((coordinates) => {
    if (!coordinates) {
      alert("Location shrouded in darkness. No weather information available.");
      return;
    }

    // Get weather data using coordinates
    const { lat, lng } = coordinates;
    const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lng}&apikey=${apiKey}&fields=temperature,weatherCode,humidity,precipitation,weatherIcon,windspeed`;

    updateSearchPlaceholder(cityInput);
    updateCity(cityInput);

    // toggles search message on
    let citySearch = document.querySelector("#searching-city");
    citySearch.style.display = "block";

    axios
      .get(apiUrl)
      .then((response) => {
        weatherUpdate(response); // Updates weather data
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  });
}

// Get coordinates for the city
function getCoordinates(cityInput) {
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityInput}&key=${opencageKey}`;

  return axios
    .get(geocodeUrl)
    .then((response) => {
      const data = response.data.results;

      // validate coordinates
      if (data && data.length > 0) {
        const city = data[0];
        const lat = city.geometry.lat;
        const lng = city.geometry.lng;
        return { lat, lng };
      } else {
        console.warn("No results found.");
        return null; // if no coordinates found
      }
    })
    .catch((error) => {
      console.error("Error getting coordinates:", error);
      return null;
    });
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
    console.log("Weather values:", values); // logs weather values

    // Checks if weatherCode exists in the response
    console.log("Weather code:", values.weatherCode);

    // Update the HTML with the weather information
    weatherTemp.innerHTML = `${Math.round(values.temperature)}°C`;
    weatherWindspeed.innerHTML = `${values.windSpeed}`;
    weatherHumidity.innerHTML = `${values.humidity}`;

    // Get weather code description
    function getDescription(code) {
      if (!code) {
        console.warn("Weather code is missing or invalid.");
        return "One does not simply know the forecast!";
      }
      return weatherCodes.weatherCode[code] || "No data available";
    }

    // Update weather description
    weatherDescription.innerHTML = getDescription(values.weatherCode);

    // Maps weather icon to weather code
    const iconUrl = weatherIcons[values.weatherCode] || weatherIcons[0];

    // Update weather icon
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="weather icon" />`;
  } else {
    console.error("Invalid or missing data in response", response);
  }
}

// Event listener
let form = document.querySelector("#search-field");
form.addEventListener("submit", searchClick);

// Date and time update
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

  document.querySelector("#weekday").innerHTML = day;
  document.querySelector("#month").innerHTML = month;
  document.querySelector("#day").innerHTML = date;
  document.querySelector("#year").innerHTML = year;
  document.querySelector("#hour").innerHTML = hour;
  document.querySelector("#min").innerHTML = minutes;
}

updateDatTime();
