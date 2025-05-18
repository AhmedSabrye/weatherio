const API_KEY = "907e71780d684469b56113223251805";
const BASE_URL = "https://api.weatherapi.com/v1";
export const fetchWeatherData = async (query: string) => {
  const apiUrl = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&days=10`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
};

export const weatherIcons = {
  sunny: "https://cdn-icons-png.flaticon.com/512/979/979585.png",
  clear: "https://cdn-icons-png.flaticon.com/512/979/979585.png",
  cloudy: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
  overcast: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
  "partly cloudy": "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  rain: "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
  "light rain": "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
  "moderate rain": "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
  "heavy rain": "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
  drizzle: "https://cdn-icons-png.flaticon.com/512/1959/1959338.png",
  thunderstorm: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
  thunder: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
  lightning: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
  snow: "https://cdn-icons-png.flaticon.com/512/642/642000.png",
  "light snow": "https://cdn-icons-png.flaticon.com/512/642/642000.png",
  "heavy snow": "https://cdn-icons-png.flaticon.com/512/642/642000.png",
  fog: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
};

export const getLargeWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();

  for (const [keyword, iconUrl] of Object.entries(weatherIcons)) {
    if (conditionLower.includes(keyword)) {
      return iconUrl;
    }
  }

  return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
};
