const weatherCodes = {
  weatherCode: {
    0: "Unknown",
    1000: "Clear, Sunny",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  },
};

//mapped icons
const weatherIcons = {
  0: "https://cdn-icons-png.flaticon.com/128/1680/1680365.png", // Unknown
  1000: "https://cdn-icons-png.flaticon.com/128/1113/1113737.png", // Clear, Sunny
  1100: "https://cdn-icons-png.flaticon.com/128/1472/1472784.png", // Mostly Clear
  1101: "https://cdn-icons-png.flaticon.com/128/925/925573.png", // Partly Cloudy
  1102: "https://cdn-icons-png.flaticon.com/128/13723/13723618.png", // Mostly Cloudy
  1001: "https://cdn-icons-png.flaticon.com/128/13723/13723618.png", // Cloudy
  2000: "https://cdn-icons-png.flaticon.com/128/12780/12780889.png", // Fog
  2100: "https://www.flaticon.com/free-icon/mist_2910189", // Light Fog
  4000: "https://cdn-icons-png.flaticon.com/128/3076/3076129.png", // Drizzle
  4001: "https://cdn-icons-png.flaticon.com/128/13718/13718297.png", // Rain
  4200: "https://cdn-icons-png.flaticon.com/128/13718/13718341.png", // Light Rain
  4201: "https://cdn-icons-png.flaticon.com/128/13718/13718341.png", // Heavy Rain
  5000: "https://cdn-icons-png.flaticon.com/128/13723/13723555.png", // Snow
  5001: "https://cdn-icons-png.flaticon.com/128/13722/13722767.png", // Flurries
  5100: "https://cdn-icons-png.flaticon.com/128/10873/10873793.png", // Light Snow
  5101: "https://cdn-icons-png.flaticon.com/128/3677/3677574.png", // Heavy Snow
  6000: "https://cdn-icons-png.flaticon.com/128/9258/9258722.png", // Freezing Drizzle
  6001: "https://cdn-icons-png.flaticon.com/128/10344/10344411.png", // Freezing Rain
  6200: "https://cdn-icons-png.flaticon.com/128/10344/10344411.png", // Light Freezing Rain
  6201: "https://cdn-icons-png.flaticon.com/128/10344/10344411.png", // Heavy Freezing Rain
  7000: "https://cdn-icons-png.flaticon.com/128/1999/1999846.png", // Ice Pellets
  7101: "https://cdn-icons-png.flaticon.com/128/1999/1999846.png", // Heavy Ice Pellets
  7102: "https://cdn-icons-png.flaticon.com/128/1999/1999846.png", // Light Ice Pellets
  8000: "https://cdn-icons-png.flaticon.com/128/11250/11250254.png", // Thunderstorm
};
